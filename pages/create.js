import { useContext } from "react"
import Link from 'next/link'

// contexts
import StateContext from "../states/StateContext"
import DispatchContext from "../states/DispatchContext"

// components
import Main from '../components/Main'

function Create() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  function handleSubmit(event){
    event.preventDefault()
    // send the details off to the backend
    // create user
    // get token on return
    // flash message
  }
  return (
    <Main title="Create Account">
      <h1>{appState.user.firstName} Create your Account</h1>
      <p>Fill in the form below.</p>
      <div className="column-row">
        <form onSubmit={handleSubmit} className="form-grid">
          <section className="form-grid">
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
          </section>
        </form>
      </div>
      <p className="center">Already have an account <Link href="/login">Login</Link>.</p>
    </Main>
  )
}
export default Create