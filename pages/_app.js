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
    "name": "Simon"
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
