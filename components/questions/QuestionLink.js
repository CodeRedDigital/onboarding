import { useContext, useEffect, useState } from "react"
import Link from "next/link"

// states
import StateContext from "../../states/StateContext"

// helpers
import { getObjectIndexFromKey } from "../../helpers/ArrayFunctions"

function QuestionLink(props) {
  const appState = useContext(StateContext)
  const section = props.section
  const question = props.question
  const answers = appState.answers
  const [complete, setComplete] = useState(false)
  const [answerId, setAnswerId] = useState(null)
  useEffect(() => {
    if(answers && question) {
      if(section.user) {
        setAnswerId(`${section.sectionId}-${question.id}`)
      } else {
        setAnswerId(question.id)
      }
    }
  },[])
  useEffect(() => {
    if(answerId) {
      const indexOfAnswer = getObjectIndexFromKey(answers, "id", answerId)
      if (answers[indexOfAnswer].value) {
        setComplete(true)
        props.incrementSectionCount()
      }
    }
  },[answerId])
  return (
    <li><Link href={`/questions/${section.sectionId}/${question.name}`}><a>{question.label} <span data-complete={complete}></span></a></Link></li>
  )
}

export default QuestionLink