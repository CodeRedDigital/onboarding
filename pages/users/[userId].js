/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Script from "next/script";
import { useImmerReducer } from "use-immer";
import { AxiosPali } from "../../src/AxiosRequests";
import { decode } from "he"; // used for decoding the encoded html for the modal
import parse from "html-react-parser";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
const itiUtils = require("intl-tel-input/build/js/utils.js")

// components
import Main from "../../components/Main";
import UserIcon from "../../components/UserIcon";
import LoadingSpinner from "../../components/LoadingSpinner";
import ModalLink from "../../components/ModalLink";

// states
import StateContext from "../../states/StateContext";
import DispatchContext from "../../states/DispatchContext";

export default function User(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const router = useRouter();
  const { userId } = router.query;
  const initialCurrentUserState = {
    userIsLoading: true,
    userId: userId,
    currentUserIndex: -1,
    isDisabled: false,
    thirdfort: false,
    thirdfortAndPrimary: false,
    primary: false,
    userUpdated: false,
    telUpdated: false,
    amlStarted: false,
    sendData: false,
    sendCount: 0,
    name: "",
    title: {
      value: "",
      hasErrors: false,
      message: ""
    },
    firstName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    surname: {
      value: "",
      hasErrors: false,
      message: ""
    },
    email: {
      value: "",
      hasErrors: false,
      message: ""
    },
    telephone: {
      value: "",
      hasErrors: false,
      message: ""
    },
    dialCode: "",
    telNoDialCode: "",
    contact: {
      primary: false,
      email: false,
      tel: false
    },
    primaryUser: appState.users[appState.app.indexOfPrimaryUser],
    loggedInUser: appState.users[appState.app.indexOfLoggedInUser]
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case "updateUserId":
        draft.userId = action.id;
        return;
      case "currentUserIndex":
        draft.currentUserIndex = action.index;
        return;
      case "userDownloaded":
        draft.id = action.user.id;
        draft.title.value = action.user.title;
        draft.firstName.value = action.user.firstName;
        draft.surname.value = action.user.surname;
        draft.email.value = action.user.email;
        draft.telephone.value = action.user.telephone;
        draft.dialCode = action.user.dialCode;
        draft.telNoDialCode = action.user.telNoDialCode;
        draft.contact.primary = action.user.contact.primary;
        draft.contact.email = action.user.contact.email;
        draft.contact.tel = action.user.contact.tel;
        if (appState.quote.AML.provider === "Thirdfort") {
          draft.thirdfort = true;
        }
        if (
          action.user.id === action.loggedInId ||
          action.user.id === !action.primaryId
        ) {
          draft.isDisabled = false;
        } else {
          draft.isDisabled = true;
        }
        draft.telUpdated = false;
        if (!appState.app.indexOfPrimaryUser){
          draft.userIsLoading = false;
        }
        return;
      case "loadingComplete":
        draft.userIsLoading = false;
        return
      case "titleUpdate":
        draft.title.value = action.value;
        draft.userUpdated = true;
        return;
      case "firstNameUpdate":
        draft.firstName.value = action.value;
        draft.userUpdated = true;
        return;
      case "surnameUpdate":
        draft.surname.value = action.value;
        draft.userUpdated = true;
        return;
      case "emailUpdate":
        draft.email.value = action.value;
        draft.userUpdated = true;
        return;
      case "telephoneUpdate":
        draft.telephone.value = action.value;
        if (action.dialCode){
          draft.dialCode = action.dialCode
        }
        if (action.telNoDialCode){
          draft.telNoDialCode = action.telNoDialCode
        }
        draft.userUpdated = true;
        return;
      case "telephoneSplit":
        draft.dialCode = action.dialCode;
        draft.telNoDialCode = action.telNoDialCode;
        draft.userUpdated = true;
        draft.telUpdated = false;
        return;
      case "updateTelAfterDelay":
        draft.telUpdated = true;
        return;
      case "contactUpdate":
        draft.contact.primary = action.primary;
        draft.contact.email = action.email;
        draft.contact.tel = action.tel;
        draft.userUpdated = true;
        return;
      case "startLoading":
        draft.userIsLoading = true;
        return;
      case "endLoading":
        draft.userIsLoading = false;
        return;
      case "userFinished":
        draft.userUpdated = false;
        return;
      case "setName":
        draft.name = `${action.firstName} ${action.surname}`;
        return;
      case "setThirdfortPrimary":
        if (action.primary) {
          draft.thirdfortAndPrimary = true;
          draft.primary = true;
        } else {
          draft.thirdfortAndPrimary = false;
          draft.primary = false;
        }
        return;
    }
  }
  const [state, dispatch] = useImmerReducer(
    ourReducer,
    initialCurrentUserState
  );

  // Page functions go here
  async function handleSubmit(event) {
    event.preventDefault();
    const buttonClicked = event.nativeEvent.submitter;
    if (buttonClicked.getAttribute("data-send") === "all") {
      sendAmlToUsers(appState.users);
    } else {
      const indexOfSingleUser = appState.users.findIndex(
        user => user.id === userId
      );
      sendAmlToUsers([appState.users[indexOfSingleUser]]);
    }
  }
  async function getUser(userId) {
    try {
      const response = await AxiosPali.get(
        `/data/test/user/${userId}-user.json`
      );
      if (response.data) {
        appDispatch({ type: "pushUser", user: response.data }); // push the missing user into the users Array
        dispatch({
          type: "userDownloaded",
          user: response.data,
          primaryId: state.primaryUser.id,
          loggedInId: state.loggedInUser.id
        });
      }
    } catch (e) {
      console.log("There was an issue getting the user");
    }
  }
  // Start AML functions
  // Decide which AML Provider to use
  async function sendAmlToUsers(users) {
    dispatch({ type: "startLoading" });
    if (appState.quote.AML.provider == "CREDAS") {
      sendCredas(users);
    } else if (appState.quote.AML.provider == "Thirdfort") {
      sendThirdfort(users);
    } else {
      appDispatch({
        type: "flashMessage",
        value:
          "There is no AML Provider associated with this quote, please contact your Solicitor."
      });
      dispatch({ type: "endLoading" });
    }
  }
  // CREDAS AML check
  async function credas(user, indexOfUser) {
    const response = await fetch("/api/credas/registrations", {
      body: JSON.stringify({
        amlCode: appState.quote.AML.credas.enhancedAMLCode,
        user,
        firm: appState.firm,
        index: indexOfUser
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    const result = await response.json();
    if (result.data.error) {
      appDispatch({
        type: "flashMessage",
        value:
          "There has been an issue please try again, if this persists contact the Solicitor."
      });
    } else {
      appDispatch({
        type: "saveCredasRegistration",
        value: result.data,
        index: result.index
      });
    }
  }
  async function sendCredas(userArray) {
    userArray.map(sendingUser => {
      const indexOfUser = appState.users.findIndex(
        user => user.id === sendingUser.id
      );
      credas(sendingUser, indexOfUser)
    })
    dispatch({ type: "endLoading" });
  }
  // thirdfort AML check
  async function sendThirdfort(userArray) {
    const now = Math.floor(Date.now() / 1000);
    let token = "";
    if (now < appState.quote.AML.thirdfort.jwtExpiry) {
      console.log("the current token in state is OK");
      token = appState.quote.AML.thirdfort.jwt;
    } else {
      console.log("the current token in state is too old");
      const jwtToken = async () => {
        const res = await fetch("/api/thirdfort/createJWT", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        });
        const result = await res.json();
        token = result.token;
        appDispatch({
          type: "saveThirdfortToken",
          token,
          tokenExpiry: result.tokenExpiry
        });
      };
      jwtToken();
    }
    // there is an issue her with the token not being set before proceeding due to the await on line 272
    const stubUserId =
      appState.firm.solicitors[appState.app.indexOfAssociatedSolicitor]
        .thirdfort.stubUser.id;
    const transactionConfig = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Id": stubUserId
    };
    async function thirdfort(config, body, indexOfUser) {
      const response = await fetch("/api/thirdfort/transactions", {
        body: JSON.stringify({
          config,
          body,
          index: indexOfUser
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
      const result = await response.json();
      if (result.data.error) {
        appDispatch({
          type: "flashMessage",
          value:
            "There has been an issue please try again, if this persists contact the Solicitor."
        });
      } else {
        appDispatch({
          type: "saveThirdfortTransaction",
          value: result.data,
          index: result.index
        });
      }
    }
    userArray.map(sendingUser => {
      const indexOfUser = appState.users.findIndex(
        user => user.id === sendingUser.id
      ); // this is used to dispatch the response to the correct user
      let telephone = "";
      if (sendingUser.contact.tel) {
        telephone = sendingUser.telephone;
      } else if (sendingUser.contact.primary) {
        telephone = appState.appData.primaryUser.telephone;
      }
      // create the conditional parts telephone if contact primary
      let transactionBody = {};
      if (appState.quote.type.toLowerCase().includes("sale")) {
        // find the address being sold
        const address = appState.quote.associatedAddresses.find(address => address.type === "sale")
        // Quote is purchase
        transactionBody = {
          type: "v2",
          ref: appState.quote.id,
          name: `Sale of ${address.address1}`,
          request: {
            actor: {
              name: `${sendingUser.firstName} ${sendingUser.surname}`,
              phone: telephone
            },
            tasks: [
              {
                type: "documents:poa"
              },
              {
                type: "documents:poo"
              },
              {
                type: "report:identity",
                opts: {
                  nfc: "preferred"
                }
              },
              {
                type: "report:footprint"
              },
              {
                type: "report:peps"
              }
            ]
          },
          metadata: {}
        };
      } else {
        const address = appState.quote.associatedAddresses.find(address => address.type === "purchase")
        transactionBody = {
          type: "v2",
          ref: appState.quote.id,
          name: `Purchase of ${address.address1}`,
          request: {
            actor: {
              name: `${sendingUser.firstName} ${sendingUser.surname}`,
              phone: telephone
            },
            tasks: [
              {
                type: "documents:poa"
              },
              {
                type: "report:identity",
                opts: {
                  nfc: "preferred"
                }
              },
              {
                type: "report:footprint"
              },
              {
                type: "report:peps"
              }
            ]
          },
          metadata: {}
        };
      }
      thirdfort(transactionConfig, transactionBody, indexOfUser);
    });
    dispatch({ type: "endLoading" });
  }
  // End AML functions
  // Page functions end here
  // useEffects start here
  useEffect(() => {
    if (!state.primaryUser || !state.loggedInUser) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    console.log(`the state of telUpdated = ${state.telUpdated}`)
    if (!state.telUpdated) {
      console.log("the telephone delay is happening")
      console.log(appState.firm.delay)
      const telDelay = setTimeout(() => dispatch({type: "updateTelAfterDelay"}), 4000);
      return () => clearTimeout(telDelay)
    } else {console.log("No delay happening")}
  }, [state.telephone.value, userId]);
  useEffect(() => {
    dispatch({ type: "updateUserId", id: userId });
  }, [router.query]);
  useEffect(() => {
    if (appState.app.indexOfPrimaryUser !== null && !state.userIsLoading){
      dispatch({ type: "loadingComplete" })
    }
  },[appState.app.indexOfPrimaryUser])
  useEffect(() => {
    if (document.querySelector("#telephone")) {
      const input = document.querySelector("#telephone");
      const iti = intlTelInput(input, {
        // any initialisation options go here
        initialCountry: "gb",
        preferredCountries: [],
        separateDialCode: true,
        utilsScript: itiUtils
      });
      function splitTelephone() {
        if (input.value.trim()) {
          console.log(iti.getSelectedCountryData().dialCode)
          const number = iti.getNumber()
          const dialCode = "+" + iti.getSelectedCountryData().dialCode;
          const telNoDialCode = number.slice(dialCode.length);
          dispatch({ type: "telephoneSplit", dialCode, telNoDialCode });
          appDispatch({
            type: "telephoneUpdate",
            dialCode,
            telNoDialCode,
            user: state.currentUserIndex
          });
        } else {
          console.log("There is currently no value on this field");
        }
      }
      splitTelephone();
    }
  }, [state.telUpdated, userId]);
  useEffect(() => {
    let indexOfUser = appState.users.findIndex(
      user => user.id === state.userId
    );
    dispatch({ type: "currentUserIndex", index: indexOfUser });
    if (!state.primaryUser) {
      appDispatch({ type: "resetApp" })
      router.push('/')
    }
    if (state.currentUserIndex !== -1) {
      // stuff to do when currentUserIndex has a value
      if (appState.users.some(i => i.id.includes(state.userId))) {
        // checks to see if the id is in the list of users in state
        dispatch({
          type: "userDownloaded",
          user: appState.users[state.currentUserIndex],
          primaryId: state.primaryUser.id,
          loggedInId: state.loggedInUser.id
        });
      } else {
        // if the id is not in the list of users in state
        getUser(state.userId); // fetches the user from DB
      }
      if (appState.quote.AML.provider === "Thirdfort") {
        dispatch({
          type: "setThirdfortPrimary",
          primary:
            appState.app.indexOfPrimaryUser === state.currentUserIndex
              ? true
              : false
        });
      }
    }
  }, [state.userId, state.currentUserIndex]);
  useEffect(() => {
    dispatch({
      type: "setName",
      firstName: state.firstName.value,
      surname: state.surname.value
    });
  }, [state.firstName.value, state.surname.value]);
  useEffect(() => {
    if (state.userUpdated) {
      localStorage.setItem("currentUser", JSON.stringify(state));
      appDispatch({
        type: "updateUsersArray",
        user: state.currentUserIndex,
        title: state.title.value,
        firstName: state.firstName.value,
        surname: state.surname.value,
        email: state.email.value,
        telephone: state.telephone.value,
        contact: state.contact,
        dialCode: state.dialCode,
        telNoDialCode: state.telNoDialCode
      });
      dispatch({ type: "userFinished" });
    }
  }, [state.userUpdated]);
  // useEffects end here

  return (state.userIsLoading ? <Main title="loading"><LoadingSpinner /></Main> :
    <Main title={state.name}>
      <div className="seller-info">
        <div className="sellers">
          {appState.quote.associatedUsers.map((user, index) => {
            return (
              <UserIcon
                current={state.userId}
                id={user.id}
                key={user.id}
                index={index}
              />
            );
          })}
        </div>
      </div>
      <h1>{state.name}</h1>
      <div id="instructions">
        <p>
          We now need to check your details before we proceed. Please check
          carefully that all the fields are filled in and correct.
        </p>
        <p>
          Once all of these fields have been completed we will pass them over to
          our trust partner{" "}
          <ModalLink
            name={appState.quote.AML.provider}
            href="#amlButton"
            className=""
            data-modal-open={appState.quote.AML.provider + "Modal"}
            data-button={appState.quote.AML.provider + "Button"}
            data-name={appState.quote.AML.provider}
            modalLinkContent={parse(
              unescape(
                state.thirdfort
                  ? appState.firm.modalContent.thirdfort
                  : appState.firm.modalContent.credas
              )
            )}
          />
          , to do Identity and Financial checks.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="user">
        <section className="form-grid">
          <label htmlFor="title">Title</label>
          <div>
            <input
              id="title"
              type="text"
              value={state.title.value}
              disabled={state.isDisabled}
              onChange={e =>
                dispatch({ type: "titleUpdate", value: e.target.value })
              }
            />
            <div
              className="
              alert alert-danger
              small
              liveValidateMessage liveValidateMessage-enter-done
            "
            >
              Please enter your Title.
            </div>
          </div>
          <label htmlFor="first-name">First name</label>
          <div>
            <input
              id="first-name"
              type="text"
              value={state.firstName.value}
              disabled={state.isDisabled}
              onChange={e =>
                dispatch({ type: "firstNameUpdate", value: e.target.value })
              }
            />
            <div
              className="
              alert alert-danger
              small
              liveValidateMessage liveValidateMessage-enter-done
            "
            >
              Please enter your first name.
            </div>
          </div>
          <label htmlFor="surname">Surname</label>
          <div>
            <input
              id="surname"
              type="text"
              value={state.surname.value}
              disabled={state.isDisabled}
              onChange={e =>
                dispatch({ type: "surnameUpdate", value: e.target.value })
              }
            />
            <div
              className="
              alert alert-danger
              small
              liveValidateMessage liveValidateMessage-enter-done
            "
            >
              Please enter your Surname.
            </div>
          </div>
          <label htmlFor="email">email address</label>
          <div>
            <input
              id="email"
              type="email"
              value={state.email.value}
              disabled={state.isDisabled}
              onChange={e =>
                dispatch({ type: "emailUpdate", value: e.target.value })
              }
            />
            <div
              className="
              alert alert-danger
              small
              liveValidateMessage liveValidateMessage-enter-done
            "
            >
              Please enter a valid email address.
            </div>
          </div>
          <label htmlFor="telephone">Mobile telephone</label>
          <div>
            <input
              id="telephone"
              type="tel"
              value={state.telephone.value}
              disabled={state.isDisabled}
              onChange={e =>
                dispatch({ type: "telephoneUpdate", value: e.target.value })
              }
            />
            <div
              className="
              alert alert-danger
              small
              liveValidateMessage liveValidateMessage-enter-done
            "
              data-input="telWarning"
            >
              Invalid phone number.
            </div>
          </div>
          <label htmlFor="contact" className="span-grid">
            Send Identity Check
          </label>
          {!state.thirdfortAndPrimary && (
            <>
              <div id="identity-hint" className="pali-hint">
                Where would you like your identity check link sent to?
              </div>
              <div className="pali-radios pali-radios">
                {state.primaryUser.id !== state.userId && (
                  <div className="pali-radios__item">
                    <input
                      className="pali-radios__input"
                      id="send-to-primary"
                      name="contact"
                      type="radio"
                      value="primary"
                      checked={props.primarySelected}
                      onClick={() =>
                        dispatch({
                          type: "contactUpdate",
                          tel: false,
                          email: false,
                          primary: true
                        })
                      }
                    />
                    <label
                      className="pali-label pali-radios__label"
                      htmlFor="send-to-primary"
                    >
                      {state.primaryUser.firstName}&apos;s phone
                      {appState.quote.AML.provider === "CREDAS" && "/email"}
                    </label>
                  </div>
                )}
                {appState.quote.AML.provider === "CREDAS" && (
                  <div className="pali-radios__item">
                    <input
                      className="pali-radios__input"
                      id="send-to-email"
                      name="contact"
                      type="radio"
                      value="email"
                      disabled={state.isDisabled}
                      checked={state.contact.email}
                      onClick={() =>
                        dispatch({
                          type: "contactUpdate",
                          tel: false,
                          email: true,
                          primary: false
                        })
                      }
                    />
                    <label
                      className="pali-label pali-radios__label"
                      htmlFor="send-to-email"
                    >
                      email
                    </label>
                  </div>
                )}
                <div className="pali-radios__item">
                  <input
                    className="pali-radios__input"
                    id="send-to-tel"
                    name="contact"
                    type="radio"
                    value="tel"
                    disabled={state.isDisabled}
                    checked={state.contact.tel}
                    onClick={() =>
                      dispatch({
                        type: "contactUpdate",
                        tel: true,
                        email: false,
                        primary: false
                      })
                    }
                  />
                  <label
                    className="pali-label pali-radios__label"
                    htmlFor="send-to-tel"
                  >
                    telephone
                  </label>
                </div>
              </div>
            </>
          )}
        </section>
        <button
          className="btn primary"
          disabled={state.isDisabled}
          data-send={state.userId}
        >
          Send {appState.quote.AML.provider} Link for {state.firstName.value}
        </button>
        {appState.user.id === state.userId &&
          state.primaryUser.id === state.userId && (
            <button
              className="btn primary"
              disabled={state.isDisabled}
              data-send="all"
            >
              Send All {appState.quote.AML.provider} Links
            </button>
          )}
      </form>
      <Script
        id="modal-js"
        src="/js/modal.js"
        onLoad={() => {
          ARIAmodal.init();
        }}
      />
    </Main>
  );
}
