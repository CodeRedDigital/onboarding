import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import { Link } from "next/link"

// components
import LoadingSpinner from "../../../components/LoadingSpinner"
import Main from "../../../components/Main";
import QuestionLink from "../../../components/questions/QuestionLink"

// states
import StateContext from "../../../states/StateContext";

// helpers
import { getObjectIndexFromKey } from "../../../helpers/ArrayFunctions"

function Section() {
  const router = useRouter()
  const appState = useContext(StateContext)
  const [section, setSection] = useState(null);
  useEffect(() => {
    if (router.isReady) {
      const sectionId = router.query.section
      const sections = appState.sortedQuestions
      const indexOfSection = getObjectIndexFromKey(sections, "sectionId", sectionId)
      setSection(sections[indexOfSection])
    }
  },[router.isReady])
  // const answered = Math.floor((Math.random() * section.questions.length) + 1)
  return (section === null ? <Main title="loading"><LoadingSpinner /></Main> :
    <Main title={section.sectionLabel}>
      <h1>{section.sectionLabel}</h1>
      <ul>
        {section.questions.map((question, index) => {
          return (<QuestionLink key={index} section={section} question={question}></QuestionLink>)
        })}
      </ul>
    </Main>
  )
}

export default Section