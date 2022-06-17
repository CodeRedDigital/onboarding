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
  const [prev,setPrev] = useState()
  const [next,setNext] = useState()
  const questionName = router.query.questionid
  const sectionId = router.query.section
  const sortedQuestions = appState.sortedQuestions
  const sectionIndex = getObjectIndexFromKey(sortedQuestions, "sectionId", sectionId)
  const section = sortedQuestions[sectionIndex]
  let questionIndex = null
  let question = null
  console.log(`Prev ${prev}, Next ${next}, qName ${questionName}, sId ${sectionId}, sIndex ${sectionIndex}, qIndex ${questionIndex}`)
  useEffect(() => {
    if (section) {
      questionIndex = getObjectIndexFromKey(section.questions, "name", questionName)
      console.log(questionIndex)
    }
    if (questionIndex) {
      question = section.questions[questionIndex]
      // set prev & next question url
      console.log(`section index = ${sectionIndex}`)
      console.log(`question Index = ${questionIndex}`)
      let sectionPath
      let questionPath
      if(sectionIndex === 0 && questionIndex === 0) {
        setPrev(null)
      } else {
        if (questionIndex === 0) {
          sectionPath = appState.sortedQuestions[sectionIndex -1].sectionId
          questionPath = appState.sortedQuestions[sectionIndex -1].questions[appState.sortedQuestions[sectionIndex -1].questions.length -1].name
        } else {
          sectionPath = appState.sortedQuestions[sectionIndex].sectionId
          questionPath = appState.sortedQuestions[sectionIndex].questions[questionIndex -1].name
        }
        setPrev(`${sectionPath}/${questionPath}`)
        console.log(prev)
      }
      if(sectionIndex === (appState.sortedQuestions.length -1) && questionIndex === (appState.sortedQuestions[sectionIndex].questions.length - 1)) {
        setNext(null)
      } else {
        if (questionIndex === appState.sortedQuestions[sectionIndex].questions.length - 1) {
          sectionPath = appState.sortedQuestions[sectionIndex + 1].sectionId
          questionPath = appState.sortedQuestions[sectionIndex + 1].questions[0].name
        } else {
          sectionPath = appState.sortedQuestions[sectionIndex].sectionId
          questionPath = appState.sortedQuestions[sectionIndex].questions[questionIndex + 1].name
        }
        setNext(`${sectionPath}/${questionPath}`)
        console.log(next)
      }
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
      <QuestionNav prev={prev} next={next} ></QuestionNav>
    </QuestionsMain>
  )
}

export default Question