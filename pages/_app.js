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

// modules
import { AxiosPali } from '../src/AxiosRequests'

function OnboardingApp({ Component, pageProps }) {
  const initialState = {
    flashMessages: [],
    app: {
      loggedIn: false,
      loading: true,
      urlDataFetched: false,
      urlData: {},
      localDataFetched: false,
      localData: {},
      firmData: null,
      quoteData: null,
      userData: null,
      usersData: null,
      appUpdated: false,
      firmUpdated: false,
      quoteUpdated: false,
      userUpdated: false,
      usersUpdated: false,
      unknownUser: false,
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
      colours: {
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
      // login and out cases
      case "login":
        draft.app.loggedIn = true;
        return;
      case "logout":
        draft.app.loggedIn = false;
        return;
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
        draft.app.quoteData = "success";
        draft.app.quoteUpdated = true
        draft.app.appUpdated = true
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
          draft.app.userData = "success";
          draft.app.userUpdated = true
          draft.app.appUpdated = true
        }
        return;
      // save the firm data to state
      case "firmDownloaded":
        draft.firm.id = action.firm.id;
        draft.firm.name = action.firm.name;
        draft.firm.url = action.firm.url;
        draft.firm.colours.primary = action.firm.colours.primary;
        draft.firm.colours.primaryOpposite = action.firm.colours.primaryOpposite;
        draft.firm.colours.secondary = action.firm.colours.secondary;
        draft.firm.colours.secondaryOpposite = action.firm.colours.secondaryOpposite;
        draft.firm.colours.tertiary = action.firm.colours.tertiary;
        draft.firm.colours.tertiaryOpposite = action.firm.colours.tertiaryOpposite;
        draft.firm.logos.whiteSvg = action.firm.logos.whiteSvg;
        draft.firm.logos.whitePng = action.firm.logos.whitePng;
        draft.firm.logos.colourSvg = action.firm.logos.colourSvg;
        draft.firm.logos.colourPng = action.firm.logos.colourPng;
        draft.firm.solicitors = action.firm.solicitors;
        draft.firm.thirdfort = action.firm.thirdfort;
        draft.firm.modalContent = action.firm.modalContent;
        draft.app.firmData = "success";
        draft.app.firmUpdated = true;
        draft.app.appUpdated = true
        return;
      // data fetch starting
      case "firmStarted":
        draft.app.firmData = "pending";
        draft.app.appUpdated = true
        return
      case "quoteStarted":
        draft.app.quoteData = "pending";
        draft.app.appUpdated = true
        return
      case "userStarted":
        draft.app.userData = "pending";
        draft.app.appUpdated = true
        return
      case "usersStarted":
        draft.app.usersData = "pending";
        draft.app.appUpdated = true
        return
      // data fetch failures
      case "firmFailed":
        draft.app.firmData = "fail";
        draft.app.appUpdated = true
        return
      case "quoteFailed":
        draft.app.quoteData = "fail";
        draft.app.appUpdated = true
        return
      case "userFailed":
        draft.app.userData = "fail";
        draft.app.appUpdated = true
        return
      case "usersFailed":
        draft.app.usersData = "fail";
        draft.app.appUpdated = true
        return
      // flag to redirect to login if the user is unknown
      case "unknownUser":
        draft.app.unknownUser = true
        // draft.app.loading = false
        draft.app.appUpdated = true
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
        }
      } catch (error) {
        console.log("error")
        console.log(error.response.status)
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the quote, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({type: "quoteFailed"});
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
        } 
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the user, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({ type: "userFailed" });
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
        }
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting the solicitor, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
          dispatch({ type: "firmFailed" });
        }
      }
    }
    // check to see which things need updating
    // check to see if the quote is available
    function checkQuote() {
      dispatch({type: "quoteStarted"})
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
          }
        } else {
          console.log("A3. No URL quote but Local Quote using local quote");
          dispatch({
            type: "quoteDownloaded",
            quote: localQuote
          });
        }
      } else if (urlQuote) {
        console.log("A4. No local quote but url Quote fetching quote from db");
        getQuote(urlQuote);
      } else if (state.app.urlData.user || state.app.localData.user) {
        // find quotes associated with the user
        console.log(
          "A5. there is no quote but there is a user we shall display an array of quotes associated with the user"
        );
        dispatch({ type: "quoteFailed" })
      } else {
        dispatch({
          type: "flashMessage",
          value:
            "There is an issue with the link you were sent please contact the solicitor to rectify this. The Quote and User are missing."
        });
        dispatch({type: "quoteFailed"});
        dispatch({type: "userFailed"});
        dispatch({type: "unknownUser"});
      }
    }
    // check that the user is available and associated with the quote
    function checkUser() {
      let localUser = state.app.localData.user;
      let urlUser = state.app.urlData.user;
      let trueUser = null;
      if (urlUser) {
        trueUser = urlUser;
      } else if (localUser) {
        trueUser = localUser.id;
      } // checks to see if urlUser exists and if not sets to localUser
      if (isUserInQuote(trueUser) || state.app.quoteData === "fail") {
        // checks to see if the trueUser is in the quote or if the quote failed
        console.log("the user is in the quote, or quote failed proceed");
        if (localUser) {
          // is user in localStorage
          if (urlUser) {
            // is the user in both url & localStorage
            if (localUser.id !== urlUser) {
              console.log(
                "B1 User in localStorage and url but don't match fetch from DB"
              );
              getUser(urlUser);
            } else {
              console.log(
                "B2 User in localStorage and url and they match using localStorage user"
              );
              dispatch({
                type: "userDownloaded",
                user: localUser
              });
            }
          } else {
            // user is only in localStorage
            console.log("B3 User only in localStorage using localStorage user");
            dispatch({
              type: "userDownloaded",
              user: localUser
            });
          }
        } else if (urlUser) {
          // user not in localStorage but is in url
          console.log("B4 User only in url fetch from DB");
          getUser(urlUser);
        } else {
          // there is no user in either localStorage or url
          dispatch({ type: "userFailed" });
          dispatch({
            type: "flashMessage",
            value:
              "There is no user associated with the link, please contact the solicitor for the correct link"
          });
        }
      } else {
        console.log("We are here")
        dispatch({ type: "userFailed" });
        dispatch({
          type: "flashMessage",
          value:
            "The user and the quote do not match or the user is not there, please contact the solicitor for the correct link."
        });
        dispatch({ type: "unknownUser" });
      }
    }
    function checkFirm() {
      let firmId = state.quote.associatedFirmId;
      let localFirm = state.app.localData.firm;
      let localFirmId = null;
      console.log("Getting firm")
      if (localFirm) {
        localFirmId = localFirm.id;
      }
      if (firmId === localFirmId) {
        dispatch({
          type: "firmDownloaded",
          firm: localFirm
        });
      } else if (firmId) {
        console.log("using the firmId from quote")
        getFirm(firmId);
      } else{
        console.log("no firm Id failing")
        dispatch({ type: "firmFailed" });
      }
    }
    // logic of when to run functions
    if (state.app.loading) {
      // run these tasks if the app is loading
      if (!state.app.urlDataFetched) {
        // run this if there is on urlData stored
        getUrlData();
      }
      if (!state.app.localDataFetched) {
        // run this if there is no localData
        getLocalData();
      }
      if (
        state.app.urlDataFetched &&
        state.app.localDataFetched &&
        state.app.quoteData === null
      ) {
        checkQuote();
      }
      if (["success", "fail"].includes(state.app.quoteData)) {
        console.log("Hurray time to load the user");
        checkUser();
      }
      if (["success", "fail"].includes(state.app.userData)) {
        console.log("Hurray time to load the firm");
        checkFirm();
      }
      // if (state.app.unknownUser && state.app.quoteData && !state.app.userData) {
      //   console.log("No User but there is a quote and we can use the firmId associated with the quote");
      //   checkFirm();
      // }
      // this is just for testing if toke is true set state to loggedIn
      if (state.user.token) {
        // login
        dispatch({ type: "login" });
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
    // check for fail and if so remove local storage
    if (state.app.quoteData === "fail") {
      localStorage.removeItem("quote")
    }
    if (state.app.firmData === "fail") {
      localStorage.removeItem("firm")
    }
    if (state.app.userData === "fail") {
      localStorage.removeItem("user")
    }
    if (state.app.usersData === "fail") {
      localStorage.removeItem("users")
    }
    // check to see which data has updated and store it locally
    if (state.app.appUpdated) {
      localStorage.setItem("app", JSON.stringify(state.app))
      dispatch({type: "appFinished"})
    }
    if (state.app.firmUpdated) {
      localStorage.setItem("firm", JSON.stringify(state.firm))
      dispatch({type: "firmFinished"})
      console.log(state.app)
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
  // start useEffect to handle when firmData has successfully loaded
  useEffect(() => {
    if (state.app.firmData === "success") {
      const root = document.documentElement;
      root.style.cssText = `
        --solicitor-primary: #${state.firm.colours.primary};
        --solicitor-primary-opposite: #${state.firm.colours.primaryOpposite};
        --solicitor-secondary: #${state.firm.colours.secondary};
        --solicitor-secondary-opposite: #${state.firm.colours.secondaryOpposite};
        --solicitor-tertiary: #${state.firm.colours.tertiary};
        --solicitor-tertiary-opposite: #${state.firm.colours.tertiaryOpposite};
      `
    }
  },[state.app.firmData])
  // start useEffect to handle the redirection
  useEffect(() => {
    if (state.app.unknownUser) {
      console.log("user is unknown redirecting to /login")
    }
  },[
    state.app.unknownUser
  ])
  // end useEffect to handle the redirection
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