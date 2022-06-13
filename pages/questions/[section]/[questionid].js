import { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";

// components
import LoadingSpinner from '../../../components/LoadingSpinner'
import QuestionsMain from '../../../components/QuestionsMain'
import QuestionNav from '../../../components/questions/QuestionNav.js'

// states
import StateContext from "../../../states/StateContext";
import DispatchContext from "../../../states/DispatchContext";

// helpers
import { getObjectIndexFromKey } from '../../../helpers/ArrayFunctions'

function Question() {
  const router = useRouter()
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const [loading,setLoading] = useState(false)
  const questionName = router.query.questionid
  const sectionId = router.query.section
  const sortedQuestions = appState.sortedQuestions
  const sectionIndex = getObjectIndexFromKey(sortedQuestions, "sectionId", sectionId)
  const section = sortedQuestions[sectionIndex]
  let questionIndex = null
  let question = null
  useEffect(() => {
    if (section) {
      questionIndex = getObjectIndexFromKey(section.questions, "name", questionName)
      console.log(questionIndex)
    }
    if (questionIndex) {
      question = section.questions[questionIndex]
      setLoading(true)
      console.log(question)
    }
  },[section, questionIndex])
  return (!loading ? <QuestionsMain title="Loading"><LoadingSpinner /></QuestionsMain> : 
    <QuestionsMain title={questionName} question="true">
      <div className="form-wrapper">
        <label>This question is {questionName}</label>
        <h2>{sectionId}</h2>
        
      </div>
      <QuestionNav></QuestionNav>
    </QuestionsMain>
  )
}

export default Question