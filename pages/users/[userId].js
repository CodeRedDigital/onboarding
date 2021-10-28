import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useImmerReducer } from 'use-immer'
import { AxiosPali } from '../../src/AxiosRequests'

// components
import Main from '../../components/Main'
import UserIcon from '../../components/UserIcon'
import LoadingSpinner from '../../components/LoadingSpinner'
import ModalLink from '../../components/ModalLink'

// states
import StateContext from '../../states/StateContext'
import DispatchContext from '../../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const router = useRouter()
  const {userId} = router.query
  const initialCurrentUserState = {
    userIsLoading: true,
    userId: userId,
    name: "Dave"
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "setName":
        draft.name = `${action.firstName} ${action.surname}`;
        return;
      case "one":
        console.log("This is the first case")
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialCurrentUserState)

  // Page functions go here
  // Page functions end here

  return (
    <Main>
      <h1>User { userId }</h1>
      <h2>Welcome {appState.app.userData === "success" ? appState.user.firstName : ""}</h2>
      <ul>
        <li>UserId: {state.userId}</li>
        <li>Name: {state.name}</li>
        <li></li>
        <li></li>
      </ul>
    </Main>
  )
}