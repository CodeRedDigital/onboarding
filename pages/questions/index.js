import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

// components
import LoadingSpinner from "../../components/LoadingSpinner"
import Main from "../../components/Main"

// states
import StateContext from "../../states/StateContext";

function QuestionsHome() {
  const appState = useContext(StateContext)
  const router = useRouter()
  const sectionName = router.query.section
  useEffect(() => {
    if(appState.questions.length === 0) {
      console.log("fetch questions")
    }
    if(appState.sections.length === 0) {
      console.log("fetch sections")
    }
  })
  return (appState.questions.length === 0 || appState.sections.length === 0 ? <Main title="loading"><LoadingSpinner /></Main> :
    <Main title="questions">
      <h1>Questions</h1>
      <p>Below are list of sections which contain questions that will help progress your {appState.quote.type}.</p>
      <p>questions: {appState.questions.length}<br />
      sections: {appState.sections.length}</p>
    </Main>
  )
}

export default QuestionsHome