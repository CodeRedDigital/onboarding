import { useContext } from 'react'

// components
import Main from '../components/Main'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  // register function
  const register = async (pwd) => {
    const res = await fetch("/api/pali/register", {
      body: JSON.stringify({
        config: {
          apiKey: "fwuyb478trw7c4y7bytvn783c74vt7-v4nyct7n9",
          url: "https://onboarding.paliltd.com"
        },
        userId: appState.user.id,
        userEmail: appState.user.email,
        password: pwd
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
      appDispatch({type: "flashMessage", value: "Your password has been saved. Please login to continue."})
      appDispatch({ type: "validate" })
    }
  };
  async function handleSubmit(event) {
    event.preventDefault()
    const password = event.target.querySelector("#password").value
    register(password)
  }
  return (
    <Main title="Welcome">
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