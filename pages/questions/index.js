import { useRouter } from "next/router"
import { useContext } from "react"

// components
import Main from "../../components/Main"

// states
import StateContext from "../../states/StateContext";

function QuestionsHome() {
  const appState = useContext(StateContext)
  const router = useRouter()
  const sectionName = router.query.section
  return (
    <Main title="questions">
      <h1>Questions</h1>
      <p>Below are list of sections which contain questions that will help progress your {appState.quote.type}.</p>
    </Main>
  )
}

export default QuestionsHome