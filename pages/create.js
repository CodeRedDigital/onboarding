import { useContext } from "react"

// contexts
import StateContext from "../states/StateContext"
import DispatchContext from "../states/DispatchContext"

// components
import Page from '../components/Main'

function Create() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  function handleClick(e){
    e.preventDefault()
    appDispatch({type: "one", value: "Dave"})
  }
  return (
    <Page title="Create">
      <p>{appState.name} was here</p>
      <p><a href="#" onClick={handleClick}>Change Name</a></p>
    </Page>
  )
}
export default Create