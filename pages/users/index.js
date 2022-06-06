import { useRouter } from "next/router";
import Link from 'next/link'
import { useContext, useEffect } from "react"

// components
import Main from "../../components/Main";

// States
import StateContext from "../../states/StateContext";

function Users() {
  const router = useRouter()
  const appState = useContext(StateContext)
  const users = appState.users
  const indexOfPrimaryUser = appState.app.indexOfPrimaryUser
  useEffect(() => {
    if (users.length) {
      console.log(users)
      console.log(indexOfPrimaryUser)
    }
  },[users])
  return (
    <Main>
      <h1>This is a list of users</h1>
      <ul>
      {users.map((user, index) => {
        return(
          <li key={index}><Link href={`/users/${user.id}`}><a>{user.firstName} {user.surname}</a></Link></li>
        )
      })}
      </ul>
    </Main>
  )
}

export default Users