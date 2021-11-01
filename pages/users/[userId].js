/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
    primary: false,
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
      case "userDownloaded":
        draft.id = action.user.id;
        draft.title.value = action.user.title;
        draft.firstName.value = action.user.firstName;
        draft.surname.value = action.user.surname;
        draft.email.value = action.user.email;
        draft.telephone.value = action.user.telephone;
        draft.dialCode = action.user.dialCode;
        draft.telNoDialCode = action.user.telNoDialCode;
        draft.contact.primary = action.user.contact.primary;
        draft.contact.email = action.user.contact.email;
        draft.contact.tel = action.user.contact.tel;
        if (appState.quote.AML.Provider === "Thirdfort") {
          draft.thirdfort = true;
        }
        if (
          action.user.id === appState.user.id ||
          action.user.id === appState.users[primary].id
        ) {
          draft.isDisabled = false;
        } else {
          draft.isDisabled = true;
        }
        draft.telUpdated = false;
        draft.userIsLoading = false;
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
      case "setThirdfortPrimary":
        if (action.primary) {
          draft.thirdfortAndPrimary = true
          draft.primary = true
        } else {
          draft.thirdfortAndPrimary = false;
          draft.primary = false
        }
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
  },[])
  useEffect(() => {
    let indexOfUser = appState.users.findIndex(user => user.id === state.userId);
    console.log(`UserIndex = ${indexOfUser}`)
    dispatch({ type: "currentUserIndex", index: indexOfUser });
    if (state.currentUserIndex !== -1) {
      // stuff to do when currentUserIndex has a value
      if (appState.users.some(i => i.id.includes(state.userId))) {
        // checks to see if the id is in the list of users in state
        dispatch({
          type: "userDownloaded",
          user: appState.users[state.currentUserIndex],
          primary: appState.app.indexOfPrimaryUser
        });
      } else {
        // if the id is not in the list of users in state
        getUser(state.userId); // fetches the user from DB
      }
      if (appState.quote.AML.Provider === "Thirdfort") {
        console.log(`Index of Primary = ${appState.app.indexOfPrimaryUser}`)
        dispatch({
          type: "setThirdfortPrimary",
          primary: (appState.app.indexOfPrimaryUser === state.currentUserIndex ? true: false )
        });
      }
    }
  }, [state.userId, state.currentUserIndex]);
  useEffect(() => {
    dispatch({ 
      type: "setName",
      firstName: state.firstName.value,
      surname: state.surname.value
    })
  },[
    state.firstName.value,
    state.surname.value
  ])
  // useEffects end here


  return (
    <Main title={state.name}>
      <div className="seller-info">
        <div className="sellers">
          {appState.quote.associatedUsers.map((user, index) => {
            return <UserIcon current={state.userId} id={user.id} key={user.id} index={index} />
          })}
        </div>
      </div>
      <h1>{ state.name }</h1>
      <h2>Welcome {appState.app.userData === "success" ? appState.user.firstName : ""}</h2>
      <ul>
        <li>UserId: {state.userId}</li>
        <li>Name: {state.name}</li>
        <li>AML: {appState.quote.AML.Provider}</li>
        <li>Primary: {(state.primary ? "Yes": "No")}</li>
      </ul>
    </Main>
  )
}