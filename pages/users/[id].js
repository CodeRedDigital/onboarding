import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

// components
import LoadingScreen from '../../components/LoadingScreen'

// states
import StateContext from '../../states/StateContext'
import DispatchContext from '../../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext);
  return (
    <>
      <h1>Users</h1>
      <h2>Welcome {appState.app.userData === "success" ? appState.user.firstName : ""}</h2>
    </>
  )
}