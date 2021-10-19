/* eslint-disable @next/next/no-img-element */
import { useEffect, useContext } from 'react'

// components
import SolicitorLogo from './SolicitorLogo'
import LoadingSpinner from './LoadingSpinner'

// contexts
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

function LoadingScreen(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  useEffect(() => {
    document.title = `Onboarding | ${props.title}`
    window.scrollTo(0,0)
  }, [props.title])
  return (
    <div className="loading">
      <main>
        {appState.app.firmData ? <SolicitorLogo /> : <LoadingSpinner />}
      </main>
      <footer>
        <p>Powered by PALI.</p>
        <img src="/images/logos/pali-logo-white.svg" alt="PALI Logo" />
      </footer>
    </div>
  )
}

export default LoadingScreen