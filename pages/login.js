import Link from 'next/link'
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
    <Main title="login">
      <h1>{appState.user.firstName} Login</h1>
      <p>If you don&apos;t have an account <Link href="/create">Create One here</Link>.</p>
      <div className="column-row">
        <form onSubmit={handleSubmit}  className="form-grid">
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
          <label htmlFor="password">Password</label>
          <div>
            <input onChange={e => setPassword(e.target.value)} id="password" type="password" />
            <div className="alert alert-danger small"></div>
          </div>
          <button className="btn primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <p className="center">
        <Link href="/forgotten">Forgot your Password?</Link>
      </p>
    </Main>
  )
}