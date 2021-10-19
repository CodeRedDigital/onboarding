// styles
import '../styles/main.css'

// packages
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
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component {...pageProps} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default OnboardingApp
