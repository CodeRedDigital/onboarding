import { useContext } from 'react'

// components
import Main from '../../components/Main'
import UserIcon from '../../components/UserIcon'
import LoadingSpinner from '../../components/LoadingSpinner'
import ModalLink from '../../components/ModalLink'

// states
import StateContext from '../../states/StateContext'
import DispatchContext from '../../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  return (
    <Main>
      <h1>Users</h1>
      <h2>Welcome {appState.app.userData === "success" ? appState.user.firstName : ""}</h2>
    </Main>
  )
}