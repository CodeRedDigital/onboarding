import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

// components
import LoadingScreen from '../components/LoadingScreen'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  return (
    <LoadingScreen title="Loading" />
  )
}