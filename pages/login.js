import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

// components
import Main from '../components/Main'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [email, setEmail] = useState(appState.user.email)
  const [password, setPassword] = useState()
  const login = async (email,password) => {
    const res = await fetch("/api/pali/login", {
      body: JSON.stringify({
        config: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        userEmail: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    const result = await res.json();
    console.log(result)
    console.log(result.status)
    if (!result.error) {
      appDispatch({type: "flashMessage", value: "Login Successful."})
      console.log("Set the users JWT")
    }
  };
  function handleSubmit(event){
    event.preventDefault()
    login(email,password)
    // send the details off to the backend
    // create user
    // get token on return
    // flash message
  }
  return (
    <Main title="login">
      <h1>Welcome back {appState.user.firstName}</h1>
      <h2>Please login</h2>
      {/* <p>If you don&apos;t have an account <Link href="/create">Create One here</Link>.</p> */}
      <div className="column-row">
        <form onSubmit={handleSubmit}  className="form-grid">
          <label htmlFor="email">email</label>
          <div>
            <input
              onChange={e => setEmail(e.target.value)}
              id="email"
              type="email"
              value={email} // add the email into the value
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