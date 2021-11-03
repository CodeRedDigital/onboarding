/* eslint-disable react-hooks/exhaustive-deps */
// styles
import '../styles/main.css'

// packages
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const initialState = {
    flashMessages: [],
    app: {
      loggedIn: false,
      loading: true,
      loadingError: false,
      loadingErrorMsg: "",
      urlDataFetched: false,
      urlData: {},
      localDataFetched: false,
      localData: {},
      firmData: null,
      quoteData: null,
      userData: null,
      usersData: null,
      dataCount: 0,
      appUpdated: false,
      firmUpdated: false,
      quoteUpdated: false,
      userUpdated: false,
      usersUpdated: false,
      userFullData: false,
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
    user: {}
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
        draft.quote = action.quote
        draft.app.quoteData = "success";
        draft.app.dataCount++
        draft.app.quoteUpdated = true
        draft.app.appUpdated = true
        return;
      // save the user data to state
      case "userDownloaded":
        if (action.user) {
          draft.user = action.user
          draft.app.userData = "success";
          draft.app.dataCount++
          draft.app.userUpdated = true
          draft.app.appUpdated = true
        }
        return
      case "telephoneSplit":
        draft.users[action.user].dialCode = action.dialCode;
        draft.users[action.user].telNoDialCode = action.telNoDialCode;
        draft.app.usersUpdated = true
        draft.app.appUpdated = true
        return;
      // when logged in update the user with all details
      case "fullCurrentUser":
        draft.user = action.user
        draft.app.userUpdated = true
        return
      // set user data to be full
      case "userComplete":
        console.log("complete user")
        draft.user.complete = true
        draft.app.userUpdated = true
        draft.app.appUpdated = true
        return
      // save the firm data to state
      case "firmDownloaded":
        draft.firm = action.firm
        draft.app.firmData = "success";
        draft.app.dataCount++
        draft.app.firmUpdated = true;
        draft.app.appUpdated = true
        return;
      // save the users to state
      case "updateAssociatedUsers":
        draft.users = action.users
        draft.app.usersUpdated = true
        draft.app.appUpdated = true
        draft.app.usersData = "success"
        return
      case "pushUser":
        draft.users.push(action.user);
        draft.app.usersUpdated = true;
        draft.app.appUpdated = true
        return
      case "updateUsersArray":
        draft.users[action.user].title = action.title
        draft.users[action.user].firstName = action.firstName
        draft.users[action.user].surname = action.surname
        draft.users[action.user].email = action.email
        draft.users[action.user].telephone = action.telephone
        draft.users[action.user].contact = action.contact
        draft.app.usersUpdated = true;
        draft.app.appUpdated = true;
        if (draft.users[action.user].id === draft.user.id) {
          draft.user.title = action.title
          draft.user.firstName = action.firstName
          draft.user.surname = action.surname
          draft.user.email = action.email
          draft.user.telephone = action.telephone
          draft.user.contact = action.contact
          draft.app.userUpdated = true
        }
        draft.app.appUpdated = true;
        return
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
        draft.app.dataCount++
        draft.app.appUpdated = true
        return
      case "quoteFailed":
        draft.app.quoteData = "fail";
        draft.app.dataCount++
        draft.app.appUpdated = true
        return
      case "userFailed":
        draft.app.userData = "fail";
        draft.app.dataCount++
        draft.app.appUpdated = true
        return
      case "usersFailed":
        draft.app.usersData = "fail";
        draft.app.appUpdated = true
        return
      // flag to redirect to login if the user is unknown
      case "unknownUser":
        draft.app.unknownUser = true
        draft.app.appUpdated = true
      // Data loaded
      case "loaded":
        draft.app.loading = false
        return
      // There has been an issue loading the user
      case "loadingIssue":
        draft.app.loadingError = true
        draft.app.loadingErrorMsg = action.message
        return
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
      // Permissions page dispatches
      case "agreements":
        draft.user.agreed.tAndC = true
        draft.user.agreed.gdpr = true
        draft.user.agreed.all = true
        draft.app.userUpdated = true
        if (action.user) {
          draft.users[action.user].agreed.gdpr = true
          draft.users[action.user].agreed.tAndC = true
          draft.users[action.user].agreed.all = true
          draft.app.usersUpdated = true
        }
        return;
      case "validate":
        draft.user.validated = true
        draft.app.userUpdated = true
        return
      // assign indexes of primary and current users
      case "setIndexes":
        draft.app.indexOfPrimaryUser = action.primaryIndex
        draft.app.indexOfLoggedInUser = action.currentIndex
        draft.app.indexOfAssociatedSolicitor = action.solicitorIndex
        return
      case "saveThirdfortToken":
        draft.quote.AML.thirdfort.jwt = action.token;
        draft.quote.AML.thirdfort.jwtExpiry = action.tokenExpiry;
        draft.app.quoteUpdated = true
        draft.app.appUpdated = true
        return;
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
      }
    }
    // check that the user is available and associated with the quote
    function checkUser() {
      // dispatch({type: "userStarted"})
      let localUser = state.app.localData.user;
      let urlUser = state.app.urlData.user;
      let trueUser = null;
      if (urlUser) {
        trueUser = urlUser
      } else if (localUser) {
        trueUser = localUser.id;
      } // checks to see if urlUser exists and if not sets to localUser
      if (isUserInQuote(trueUser) || state.app.quoteData === "fail") {
        // checks to see if the trueUser is in the quote or if the quote failed
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
        dispatch({ type: "userFailed" });
        dispatch({
          type: "flashMessage",
          value:
            "The user and the quote do not match or the user is not there, please contact the solicitor for the correct link."
        });
      }
    }
    function checkFirm() {
      dispatch({type: "firmStarted"})
      let firmId = state.quote.associatedFirmId;
      let localFirm = state.app.localData.firm;
      let localFirmId = null
      if (localFirm) {
        localFirmId = localFirm.id;
      }
      if (firmId === localFirmId) {
        dispatch({
          type: "firmDownloaded",
          firm: localFirm
        });
      } else if (firmId) {
        getFirm(firmId);
      } else{
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
        checkUser();
      }
      if (["success", "fail"].includes(state.app.userData)) {
        checkFirm();
      }
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
      router.push('/login')
    }
    if (state.app.dataCount >= 3) {
      if (state.app.userData === "fail") {
        dispatch({type: "unknownUser"});
      }
      // dispatch({ type: "loaded" })
      if (state.app.quoteData === "success" && state.app.firmData === "success" && state.app.userData === "success") {
        // all the data has been loaded successfully work out the current state of the user
        // has the user not been validated
        if (!state.user.validated) {
          router.push('/welcome')
        } else if (!state.user.token) {
          router.push('/login')
        } else {
          // check if current user has accepted all terms
          if (state.user.agreed.all) {
            // if yes redirect to router.push('/users/state.user.id')
            router.push(`/users/${state.user.id}`)
          } else {
            // if no redirect to router.push('/permissions')
            router.push('/permissions')
          }
        }
      } else {
        dispatch({ 
          type: "loadingIssue",
          message: "There has been an issue trying to refresh your current session, either login below or contact your Solicitor for the correct URL."
        })
        router.push('/login')
      }
      if (state.user.agreed.all) {
        router.push(`/users/${state.user.id}`)
      }
      dispatch({ type: "loaded"})
    }
  },[
    state.app.unknownUser,
    state.app.userData,
    state.app.firmData,
    state.app.quoteData,
    state.user.validated,
    state.user.agreed
  ])
  // end useEffect to handle the redirection
  // start when user is logged in
  useEffect(() => {
    async function getAssociatedUser(userId) {
      try {
        const fetchUser = await AxiosPali.get(`/data/test/user/${userId}-user.json`);
        if (fetchUser.data) {
          return fetchUser.data
        }
      } catch (error) {
        if (error.response.status == "404") {
          dispatch({
            type: "flashMessage",
            value:
              "There was an issue getting one of the users associated with this Quote, either it does not exist or there was a bad connection. Contact the solicitor who sent you this link if the problem continues"
          });
        }
      }
    }
    async function getAllAssociatedUsers() {
      if (state.quote.associatedUsers.length > 0) {
        // check that the quote has users associated with it
        const associatedUsers = state.quote.associatedUsers; // assign the array of associated users in the quote to a shorted variable name
        let currentUser = state.user || []; // assign the array of local users in state to a shorted variable name
        let newUsers = []; // create an empty array to store the associated users in
        for (let i = 0; i < associatedUsers.length; i++) {
          // create an loop for the number of associated users in the quote
          // check to see if the current associated user is in the current logged in user and update it
          if (currentUser.id === associatedUsers[i].id) {
            // if the id is of the current user push it into the array and update the user in state
            if (currentUser.complete) {
              console.log("the current user is already full using it")
              newUsers.push(currentUser)
            } else {
              console.log("the current user is not full fetching it")
              const fetchCurrentUser = await getAssociatedUser(
                state.user.id
              ).then(result => {
                // go fetch the associated user from DB
                return result; // once the fetch has finished return it
              })
               // push the fetched user into the array
              newUsers.push(fetchCurrentUser)
              // update user in state
              dispatch({ type: "fullCurrentUser", user: fetchCurrentUser })
              dispatch({ type: "userComplete" })
            }
          } else {
            // if the user is NOT in local data it's index will be -1
            const fetchedUser = await getAssociatedUser(
              associatedUsers[i].id
            ).then(result => {
              // go fetch the associated user from DB
              return result; // once the fetch has finished return it
            });
            newUsers.push(fetchedUser); // push the fetched user into the array
          }
        }
        dispatch({ type: "updateAssociatedUsers", users: newUsers }); // add the new array into state
        // set the primaryUser
        router.push(`/users/${state.user.id}`)
      } else {
        // if there are no associated users display a flash message
        dispatch({
          type: "flashMessage",
          value:
            "There are no users associated with this quote, please contact the Solicitor that sent you this link."
        });
      }
    }
    if (state.app.loggedIn) {
      // TO DO check if the users in local storage match the user associated with the quote and if so use that
      // fetch users
      getAllAssociatedUsers();
    }
    if (state.app.usersData === "success") {
      // set index of current and index of primary
      // set index of Primary user
      const primaryUser = state.quote.associatedUsers.find(
        ({ primary }) => primary === true
      )
      const primaryIndex = state.users.findIndex(user => user.id === primaryUser.id)
      // set index of current user
      const currentIndex = state.users.findIndex(user => user.id === state.user.id)
      // set index of associated solicitor
      const solicitor = state.quote.associatedSolicitorId
      const solicitorIndex = state.firm.solicitors.findIndex(sol => sol.id === solicitor)
      // update app state with these values
      dispatch({ type: "setIndexes", primaryIndex, currentIndex, solicitorIndex })
    }
  },[
    state.app.loggedIn,
    state.app.usersData
  ])
  // end when user is logged in
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