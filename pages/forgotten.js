import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

// components
import Main from '../components/Main'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext);
  function handleSubmit(event){
    event.preventDefault()
    // send the details off to the backend
    // create user
    // get token on return
    // flash message
  }
  return (
    <Main title="Forgotten Password">
      <h1>{appState.user.firstName}</h1>
      <p>To reset your password please enter your email address.</p>
      <div className="column-row">
        <form onSubmit={handleSubmit} className="form-grid">
          <label htmlFor="email">email</label>
          <div>
            <input
              onChange={e => setPassword(e.target.value)}
              id="email"
              type="email"
              value={appState.user.email} // add the email into the value
            />
            <div className="alert alert-danger small"></div>
          </div>
          <button className="btn primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Main>
  )
}