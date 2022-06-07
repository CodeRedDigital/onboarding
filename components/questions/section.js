import Link from 'next/link'

// components
import Progress from "./progress"

function Section(props) {
  const section = props.section
  const answered = Math.floor((Math.random() * section.questions.length) + 1)
  return (
    <details>
      <summary>
        <h3>{section.sectionLabel} <span className="progress">{answered}/{section.questions.length}</span></h3>
      </summary>
      <Progress sectionId={section.sectionId} questions={section.questions.length} answered={answered}></Progress>
      <Link href={`/questions/${section.sectionId}`}><a>View Section</a></Link>
      <ul>
        {section.questions.map((question, index) => {
          return (<li key={index}><Link href={`/questions/${section.sectionId}/${question.name}`}><a>{question.label} <span data-complete="true"></span></a></Link></li>)
        })}
      </ul>
    </details>
  )
}
export default Section