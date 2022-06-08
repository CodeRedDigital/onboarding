import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";

// components
import LoadingSpinner from "../../../components/LoadingSpinner"
import Main from "../../../components/Main";
import Progress from "../../../components/questions/progress"
import QuestionLink from "../../../components/questions/QuestionLink"

// states
import StateContext from "../../../states/StateContext";

// helpers
import { getObjectIndexFromKey } from "../../../helpers/ArrayFunctions"

function Section() {
  const router = useRouter()
  const appState = useContext(StateContext)
  const [section, setSection] = useState(null);
  const [sectionCount, setSectionCount] = useState(0)
  const incrementSectionCount = () => {
    setSectionCount(c => c + 1)
    console.log(sectionCount)
  }
  const [numOfQuestions, setNumOfQuestions] = useState(0)
  useEffect(() => {
    if (router.isReady) {
      const sectionId = router.query.section
      const sections = appState.sortedQuestions
      const indexOfSection = getObjectIndexFromKey(sections, "sectionId", sectionId)
      setSection(sections[indexOfSection])
    }
  },[router.isReady])
  useEffect(() => {
    if (section) {
      setNumOfQuestions(section.questions.length)
    }
  },[section])
  // const answered = Math.floor((Math.random() * section.questions.length) + 1)
  return (section === null ? <Main title="loading"><LoadingSpinner /></Main> :
    <Main title={section.sectionLabel}>
      <h1>{section.sectionLabel}</h1>
      <Progress sectionId="question-progress" questions={numOfQuestions} answered={sectionCount}></Progress>
      <ul>
        {section.questions.map((question, index) => {
          return (<QuestionLink key={index} section={section} question={question} incrementSectionCount={incrementSectionCount}></QuestionLink>)
        })}
      </ul>
    </Main>
  )
}

export default Section