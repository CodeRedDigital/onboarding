/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Script from 'next/script'
import { useImmerReducer } from 'use-immer'
import { AxiosPali } from '../../src/AxiosRequests'
import { decode } from "he" // used for decoding the encoded html for the modal
import parse from 'html-react-parser'

// components
import Main from '../../components/Main'
import UserIcon from '../../components/UserIcon'
import LoadingSpinner from '../../components/LoadingSpinner'
import ModalLink from '../../components/ModalLink'

// states
import StateContext from '../../states/StateContext'
import DispatchContext from '../../states/DispatchContext'

export default function User(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const router = useRouter()
  const {userId} = router.query
  const initialCurrentUserState = {
    userIsLoading: true,
    userId: userId,
    currentUserIndex: -1,
    isDisabled: false,
    thirdfort: false,
    thirdfortAndPrimary: false,
    primary: false,
    userUpdated: false,
    telUpdated: true,
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
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "updateUserId":
        draft.userId = action.id
        return
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
        if (appState.quote.AML.Provider === "Thirdfort") {
          draft.thirdfort = true;
        }
        if (
          action.user.id === appState.user.id ||
          action.user.id === appState.users[action.primary].id
        ) {
          draft.isDisabled = false;
        } else {
          draft.isDisabled = true;
        }
        draft.telUpdated = false;
        draft.userIsLoading = false;
        return;
      case "startLoading":
        draft.userIsLoading = true;
        return;
      case "endLoading":
        draft.userIsLoading = false;
        return;
      case "setName":
        draft.name = `${action.firstName} ${action.surname}`;
        return;
      case "setThirdfortPrimary":
        if (action.primary) {
          draft.thirdfortAndPrimary = true
          draft.primary = true
        } else {
          draft.thirdfortAndPrimary = false;
          draft.primary = false
        }
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialCurrentUserState)

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
      const response = await AxiosPali.get(`/data/test/user/${userId}-user.json`);
      if (response.data) {
        appDispatch({ type: "pushUser", user: response.data }); // push the missing user into the users Array
        dispatch({ type: "userDownloaded", user: response.data });
      }
    } catch (e) {
      console.log("There was an issue getting the user");
    }
  }
  // Page functions end here
  // useEffects start here
  useEffect(() => {
    console.log(`user has changed to ${userId}`)
    dispatch({type: "updateUserId", id: userId})
  },[router.query])
  useEffect(() => {
    if(appState.app.loading) {
      router.push("/")
    }
  },[])
  useEffect(() => {
    let indexOfUser = appState.users.findIndex(user => user.id === state.userId);
    console.log(`UserIndex = ${indexOfUser}`)
    dispatch({ type: "currentUserIndex", index: indexOfUser });
    if (state.currentUserIndex !== -1) {
      // stuff to do when currentUserIndex has a value
      if (appState.users.some(i => i.id.includes(state.userId))) {
        // checks to see if the id is in the list of users in state
        dispatch({
          type: "userDownloaded",
          user: appState.users[state.currentUserIndex],
          primary: appState.app.indexOfPrimaryUser
        });
      } else {
        // if the id is not in the list of users in state
        getUser(state.userId); // fetches the user from DB
      }
      if (appState.quote.AML.Provider === "Thirdfort") {
        console.log(`Index of Primary = ${appState.app.indexOfPrimaryUser}`)
        dispatch({
          type: "setThirdfortPrimary",
          primary: (appState.app.indexOfPrimaryUser === state.currentUserIndex ? true: false )
        });
      }
    }
  }, [state.userId, state.currentUserIndex]);
  useEffect(() => {
    dispatch({ 
      type: "setName",
      firstName: state.firstName.value,
      surname: state.surname.value
    })
  },[
    state.firstName.value,
    state.surname.value
  ])
  // useEffects end here


  return (
    <Main title={state.name}>
      <div className="seller-info">
        <div className="sellers">
          {appState.quote.associatedUsers.map((user, index) => {
            return <UserIcon current={state.userId} id={user.id} key={user.id} index={index} />
          })}
        </div>
      </div>
      <h1>{ state.name }</h1>
      <div id="instructions">
        <p>
          We now need to check your details before we proceed. Please check
          carefully that all the fields are filled in and correct.
        </p>
        <p>
          Once all of these fields have been completed we will pass them over to
          our trust partner{" "}
            <ModalLink
              name={appState.quote.AML.Provider}
              href="#amlButton"
              className=""
              data-modal-open={appState.quote.AML.Provider + "Modal"}
              data-button={appState.quote.AML.Provider + "Button"}
              data-name={appState.quote.AML.Provider}
              modalLinkContent={parse(unescape(state.thirdfort ? appState.firm.modalContent.thirdfort : appState.firm.modalContent.credas))}
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
          <label htmlFor="first-name" className="span-grid">
              Send Identity Check
            </label>
            <div id="identity-hint" className="pali-hint">
              Where would you like your identity check link sent to?
            </div>
            {!state.thirdfortAndPrimary && ( // check that the AML provider is thirdfort and the user is not Primary and then load radio buttons
            <div className="pali-radios pali-radios">
              {appState.users[appState.app.indexOfPrimaryUser].id !== state.id && (
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
                    {appState.users[appState.app.indexOfPrimaryUser].firstName}'s phone
                    {appState.quote.AML.Provider === "CREDAS" && "/email"}
                  </label>
                </div>
              )}
              {appState.quote.AML.Provider === "CREDAS" && (
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
          )}
        </section>
        <button
          className="btn primary"
          disabled={state.isDisabled}
          data-send={state.userId}
        >
          Send {appState.quote.AML.Provider} Link for {state.firstName.value}
        </button>
        {appState.user.id === state.userId &&
          appState.users[appState.app.indexOfPrimaryUser].id === state.userId && (
            <button
              className="btn primary"
              disabled={state.isDisabled}
              data-send="all"
            >
              Send All {appState.quote.AML.Provider} Links
            </button>
          )}
      </form>
      <Script id="modal-js" src="/js/modal.js" onLoad={() => {ARIAmodal.init()}} />
    </Main>
  )
}