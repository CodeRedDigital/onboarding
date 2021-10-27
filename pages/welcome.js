import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'

// components
import Main from '../components/Main'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  async function handleSubmit(event) {
    event.preventDefault();
    // here we will stored the data in local storage
    appDispatch({type: "flashMessage", value: "Your password has been saved."})
    appDispatch({ type: "validate" })
    // here we will speak to the database and set the users password
    // send password and get token at the same time
    // try {
    //   await AxiosPali.post('https://pali.database/register', userData)
    // } catch (error) {
    //   console.log("there was an error")
    // }
  }
  return (
    <Main>
      <h1>Welcome {appState.user.firstName}</h1>
      <p>Create a password to proceed.</p>
      <div className="column-row">
        <form onSubmit={handleSubmit} className="form-grid">
          <label htmlFor="password">Password</label>
          <div>
            <input
              onBlur={e => appDispatch({ type: "updatePassword", password: (e.target.value)})}
              id="password"
              type="password"
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
// This is the page a user will see if they haven't been before and validated their account