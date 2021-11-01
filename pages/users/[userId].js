import { useContext, useEffect } from 'react'
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
    currentUserIndex: -1,
    isDisabled: false,
    thirdfort: false,
    thirdfortAndPrimary: false,
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
      case "currentUserIndex":
        draft.currentUserIndex = action.index;
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
      case "one":
        console.log("This is the first case")
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialCurrentUserState)

  // Page functions go here
  // Page functions end here
  // useEffects start here
  useEffect(() => {
    if(appState.app.loading) {
      router.push("/")
    }
  })
  useEffect(() => {
    let indexOfUser = appState.users.findIndex(user => user.id === userId);
    console.log(`UserIndex = ${indexOfUser}`)
    dispatch({ type: "currentUserIndex", index: indexOfUser });
    if (state.currentUserIndex !== -1) {
      // stuff to do when currentUserIndex has a value
      if (appState.users.some(i => i.id.includes(state.userId))) {
        // checks to see if the id is in the list of users in state
        dispatch({
          type: "userDownloaded",
          user: appState.users[state.currentUserIndex]
        });
      } else {
        // if the id is not in the list of users in state
        getUser(state.userId); // fetches the user from DB
      }
      if (appState.quote.AML.Provider === "Thirdfort") {
        dispatch({
          type: "setThirdfortPrimary",
          primary: appState.users[state.currentUserIndex].isPrimary
        });
      }
    }
  }, [userId, state.currentUserIndex]);
  // useEffects end here


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