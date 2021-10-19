/* eslint-disable react-hooks/exhaustive-deps */
// styles
import '../styles/main.css'

// packages
import { useEffect } from 'react'
import { useImmerReducer } from 'use-immer'

//components

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
      case "one":
        console.log("One")
        console.log(action.value)
        draft.name = action.value
        return
      case "saveUrlData":
        if (action.quote) {
          draft.app.urlData.quote = action.quote;
        }
        if (action.user) {
          draft.app.urlData.user = action.user;
        }
        draft.app.urlDataFetched = true;
        draft.app.appUpdated = true
        return;
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
    getUrlData()
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
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default OnboardingApp
