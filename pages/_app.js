/* eslint-disable react-hooks/exhaustive-deps */
// styles
import '../styles/main.css'

// packages
import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

//components
import FlashMessages from '../components/FlashMessages'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

function OnboardingApp({ Component, pageProps }) {
  const initialState = {
    flashMessages: [],
    app: {
      loggedIn: false,
      loading: true,
      urlDataFetched: true,
      urlData: {},
      localDataFetched: true,
      localData: {},
      firmData: false,
      quoteData: false,
      userData: false,
      usersData: false,
      appUpdated: false,
      firmUpdated: false,
      quoteUpdated: false,
      userUpdated: false,
      usersUpdated: false,
      indexOfAssociatedSolicitor: null,
      indexOfLoggedInUser: null,
      indexOfPrimaryUser: null,
      AML: {
        credas: {
          enhancedAMLCode: "",
          regTypes: []
        },
        thirdfort: {
          jwt: "",
          jwtExpiry: "",
          tenant: {},
          stubUser: {}
        }
      }
    },
    firm: {
      id: "",
      name: "",
      url: "",
      Colours: {
        primary: "",
        primaryOpposite: "",
        secondary: "",
        secondaryOpposite: "",
        tertiary: "",
        tertiaryOpposite: ""
      },
      logos: {
        whiteSvg: "",
        whitePng: "",
        colourSvg: "",
        colourPng: ""
      },
      solicitors: [],
      modalContent: {}
    },
    quote: {
      id: "",
      associatedUsers: [],
      associatedFirmId: "",
      associatedSolicitorId: "",
      AML: {
        Provider: "",
        thirdfort: {},
        credas: {}
      },
      amlModalContent: "",
      type: "",
      addresses: []
    },
    users: [],
    user: {
      token: "",
      id: "",
      title: "",
      otherTitle: "",
      firstName: "",
      surname: "",
      email: "",
      telephone: "",
      telephoneNoDialCode: "",
      dialCode: "",
      contact: {
        email: false,
        tel: true,
        primary: false
      },
      isPrimary: false,
      agreed: {
        gdpr: false,
        tAndC: false,
        all: false
      },
      passwordFailCount: 0,
      passwordResetRequest: 0,
      AML: {
        credas: {
          Sent: false,
          Date: "",
          Id: ""
        },
        thirdfort: {
          Sent: false,
          Date: "",
          Id: ""
        }
      },
      validated: false
    }
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      // push the value into the FlashMessage state
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      // save the data from the url into app state
      case "saveUrlData":
        if (action.quote) {
          draft.app.urlData.quote = action.quote
        }
        if (action.user) {
          draft.app.urlData.user = action.user
        }
        draft.app.urlDataFetched = true
        draft.app.appUpdated = true
        return;
      // save the data from localStorage into app state
      case "saveLocalData":
        if (action.quote) {
          draft.app.localData.quote = action.quote
        }
        if (action.user) {
          draft.app.localData.user = action.user
        }
        if (action.firm) {
          draft.app.localData.firm = action.firm
        }
        if (action.users) {
          draft.app.localData.users = action.users
        }
        draft.app.localDataFetched = true
        draft.app.appUpdated = true
        return;
      // save the quote data to state
      case "quoteDownloaded":
        draft.quote.id = action.quote.id;
        draft.quote.AML.Provider = action.quote.AML.Provider;
        draft.quote.AML.thirdfort = action.quote.AML.thirdfort;
        draft.quote.AML.credas = action.quote.AML.credas;
        draft.quote.associatedUsers = action.quote.associatedUsers;
        draft.quote.associatedFirmId = action.quote.associatedFirmId;
        draft.quote.associatedSolicitorId = action.quote.associatedSolicitorId;
        draft.quote.type = action.quote.type;
        draft.quote.addresses = action.quote.associatedAddresses;
        draft.app.quoteData = true;
        draft.app.quoteUpdated = true
        return;
      // save the user data to state
      case "userDownloaded":
        if (action.user) {
          draft.user.validated = action.user.validated;
          draft.user.title = action.user.title;
          draft.user.otherTitle = action.user.otherTitle;
          draft.user.firstName = action.user.firstName;
          draft.user.surname = action.user.surname;
          draft.user.id = action.user.id;
          draft.user.email = action.user.email;
          draft.user.token = action.user.token;
          draft.user.telephone = action.user.telephone;
          draft.user.telephoneNoDialCode = action.user.telephoneNoDialCode;
          draft.user.dialCode = action.user.dialCode;
          if (action.user.agreed) {
            draft.user.agreed.gdpr = action.user.agreed.gdpr;
            draft.user.agreed.tAndC = action.user.agreed.tAndC;
            draft.user.agreed.all = action.user.agreed.all;
          }
          draft.app.userData = true;
          draft.app.userUpdated = true
        }
        return;
      // save the firm data to state
      case "firmDownloaded":
        draft.firm.id = action.firm.id;
        draft.firm.Name = action.firm.Name;
        draft.firm.url = action.firm.url;
        draft.firm.Colours.primary = action.firm.Colours.primary;
        draft.firm.Colours.primaryOpposite = action.firm.Colours.primaryOpposite;
        draft.firm.Colours.secondary = action.firm.Colours.secondary;
        draft.firm.Colours.secondaryOpposite = action.firm.Colours.secondaryOpposite;
        draft.firm.Colours.tertiary = action.firm.Colours.tertiary;
        draft.firm.Colours.tertiaryOpposite = action.firm.Colours.tertiaryOpposite;
        draft.firm.logos.whiteSvg = action.firm.logos.whiteSvg;
        draft.firm.logos.whitePng = action.firm.logos.whitePng;
        draft.firm.logos.colourSvg = action.firm.logos.colourSvg;
        draft.firm.logos.colourPng = action.firm.logos.colourPng;
        draft.firm.solicitors = action.firm.solicitors;
        draft.firm.thirdfort = action.firm.thirdfort;
        draft.firm.modalContent = action.firm.modalContent;
        draft.app.firmData = true;
        draft.app.firmUpdated = true;
        return;
      // data count to track how much data has been collected
      case "incrementDataCount":
        ++draft.app.dataCount;
        return;
      // flags for updating localStorage
      case "appFinished":
        draft.app.appUpdated = false
        return
      case "firmFinished":
        draft.app.firmUpdated = false
        return
      case "quoteFinished":
        draft.app.quoteUpdated = false
        return
      case "userFinished":
        draft.app.userUpdated = false
        return
      case "usersFinished":
        draft.app.usersUpdated = false
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  useEffect(() => {
    // functions
    // get ids from URL
    function getUrlData() {
      const params = new URL(document.location).searchParams;
      dispatch({
        type: "saveUrlData",
        quote: params.get("quote"),
        user: params.get("user")
      });
    }
    // get data from localStorage
    function getLocalData() {
      dispatch({
        type: "saveLocalData",
        quote: JSON.parse(localStorage.getItem("quote")),
        user: JSON.parse(localStorage.getItem("user")),
        firm: JSON.parse(localStorage.getItem("firm")),
        users: JSON.parse(localStorage.getItem("users"))
      });
    }
    // get the quote from database
    async function getQuote(quoteId) {
      try {
        const fetchQuote = await AxiosPali.get(
          `/data/test/loading/${quoteId}-loading.json`
        );
        if (fetchQuote.data) {
          dispatch({
            type: "quoteDownloaded",
            quote: fetchQuote.data
          });
          dispatch({ type: "incrementDataCount" });
        }
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the quote, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({ type: "incrementDataCount" });
        }
      }
    }
    // does user appear in current quote
    function isUserInQuote(idOfUser) {
      const userInQuote = state.quote.associatedUsers.find(
        ({ id }) => id === idOfUser
      ); // see if the idOfUser param exists in the quote
      if (userInQuote) {
        return true;
      } else {
        return false;
      }
    }
    // get the user if available
    async function getUser(userId) {
      try {
        const fetchUser = await AxiosPali.get(
          `/data/test/loading/${userId}-loading.json`
        );
        if (fetchUser.data) {
          dispatch({
            type: "userDownloaded",
            user: fetchUser.data
          });
          dispatch({ type: "incrementDataCount" });
        }
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the user, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({ type: "incrementDataCount" });
        }
      }
    }
    // get firm if available
    async function getFirm(firmId) {
      try {
        const fetchFirm = await AxiosPali.get(
          `/data/test/loading/${firmId}-loading.json`
        );
        if (fetchFirm.data) {
          dispatch({
            type: "firmDownloaded",
            firm: fetchFirm.data
          });
          dispatch({ type: "incrementDataCount" });
        }
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the solicitor, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({ type: "incrementDataCount" });
        }
      }
    }
    // check to see which things need updating
    // check to see if the quote is available
    function checkQuote() {
      let localQuote = state.app.localData.quote;
      let urlQuote = state.app.urlData.quote;
      if (localQuote) {
        if (urlQuote) {
          if (localQuote.id !== urlQuote) {
            // go fetch quote based upon urlQuote
            console.log("A1. Quotes both there but don't match fetch from DB");
            getQuote(urlQuote);
          } else {
            console.log(
              "A2. urlQuote but matches Local Quote using local quote"
            );
            dispatch({
              type: "quoteDownloaded",
              quote: localQuote
            });
            dispatch({ type: "incrementDataCount" });
          }
        } else {
          console.log("A3. No URL quote but Local Quote using local quote");
          dispatch({
            type: "quoteDownloaded",
            quote: localQuote
          });
          dispatch({ type: "incrementDataCount" });
        }
      } else if (urlQuote) {
        console.log("A4. No local quote but url Quote fetching quote from db");
        getQuote(urlQuote);
      } else if (state.app.urlData.user || state.app.localData.user) {
        // find quotes associated with the user
        console.log(
          "A5. there is no quote but there is a user we shall display an array of quotes associated with the user"
        );
      } else {
        dispatch({
          type: "flashMessage",
          value:
            "There is an issue with the link you were sent please contact the solicitor to rectify this. The Quote and User are missing."
        });
        dispatch({
          type: "unknownUser"
        });
      }
    }
  },[
    state.app.urlDataFetched,
    state.app.localDataFetched,
    state.app.quoteData,
    state.app.userData
  ])
  // useEffect to update the localStorage
  useEffect(() => {
    if (state.app.appUpdated) {
      localStorage.setItem("app", JSON.stringify(state.app))
      dispatch({type: "appFinished"})
    }
    if (state.app.firmUpdated) {
      localStorage.setItem("firm", JSON.stringify(state.firm))
      dispatch({type: "firmFinished"})
      if (document.querySelector(".loading")) {
        document.querySelector(".loading").classList.add("loaded");
      }
    }
    if (state.app.quoteUpdated) {
      localStorage.setItem("quote", JSON.stringify(state.quote))
      dispatch({type: "quoteFinished"})
    }
    if (state.app.userUpdated) {
      localStorage.setItem("user", JSON.stringify(state.user))
      dispatch({type: "userFinished"})
    }
    if (state.app.usersUpdated) {
      localStorage.setItem("users", JSON.stringify(state.users))
      dispatch({type: "usersFinished"})
    }
  },[
    state.app.appUpdated,
    state.app.firmUpdated,
    state.app.quoteUpdated,
    state.app.userUpdated,
    state.app.usersUpdated
  ])
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <FlashMessages messages={state.flashMessages} />
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default OnboardingApp