import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

// components
import LoadingSpinner from "../../components/LoadingSpinner"
import Main from "../../components/Main"
import Progress from "../../components/questions/progress"
import Section from "../../components/questions/section"

// states
import StateContext from "../../states/StateContext";

function QuestionsHome() {
  const appState = useContext(StateContext)
  const router = useRouter()
  const sections = appState.sortedQuestions
  console.log(sections)
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
      <div className="home-wrapper">
        <h1>Questions</h1>
        <p>Below are list of sections which contain questions that will help progress your {appState.quote.type}.</p>
        <p>questions: {appState.questions.length}<br />
        sections: {appState.sections.length}</p>
        <Progress></Progress>
        {sections.map((section, index) => {
          return (section.questions.length !== 0 ? (<Section section={section} key={index} />): "")
        })}
      </div>
    </Main>
  )
}

export default QuestionsHome