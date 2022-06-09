import { useState } from 'react'
import Link from 'next/link'

// components
import Progress from "./progress"
import QuestionLink from "./QuestionLink"

function Section(props) {
  const section = props.section
  const numOfQuestions = section.questions.length
  const [sectionCount, setSectionCount] = useState(0)
  const incrementSectionCount = () => {
    setSectionCount(c => c + 1)
  }
  return (
    <details>
      <summary>
        <h3>{section.sectionLabel} <span className="progress">{sectionCount}/{numOfQuestions}</span></h3>
      </summary>
      <Progress sectionId={section.sectionId} questions={section.questions.length} answered={sectionCount}></Progress>
      <Link href={`/questions/${section.sectionId}`}><a>View Section</a></Link>
      <ul>
        {section.questions.map((question, index) => {
          return (<QuestionLink key={index} section={section} question={question} incrementSectionCount={incrementSectionCount}></QuestionLink>)
        })}
      </ul>
    </details>
  )
}
export default Section