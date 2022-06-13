import { useContext } from 'react'
import { useRouter } from "next/router";

// components
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
  const questionName = router.query.questionid
  const sectionId = router.query.section
  const sortedQuestions = appState.sortedQuestions
  const sectionIndex = getObjectIndexFromKey(sortedQuestions, "sectionId", sectionId)
  const section = sortedQuestions[sectionIndex]
  console.log(section)
  return (
    <QuestionsMain title={questionName} question="true">
      <div className="form-wrapper">
        <h1>This question is {questionName}</h1>
        <h2>{sectionId}</h2>
      </div>
      <QuestionNav></QuestionNav>
    </QuestionsMain>
  )
}

export default Question