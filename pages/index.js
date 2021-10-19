import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

// components
import Page from '../components/Main'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  function handleClick(e){
    e.preventDefault()
    appDispatch({type: "one", value: "Dave"})
  }
  return (
    <Page title="Home">
      <p>{appState.name} was here</p>
      <p><a href="#" onClick={handleClick}>Change Name</a></p>
    </Page>
  )
}
