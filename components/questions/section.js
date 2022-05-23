// components
import Progress from "./progress"

function Section(props) {
  const section = props.section
  const answered = Math.floor((Math.random() * section.questions.length) + 1)
  console.log(section)
  return (
    <details>
      <summary>
        <h3>{section.sectionLabel} <span className="progress">{answered}/{section.questions.length}</span></h3>
      </summary>
      <Progress sectionId={section.sectionId} questions={section.questions.length} answered={answered}></Progress>
      <ul>
        {section.questions.map((question, index) => {
          return (<li key={index}><a href={`/questions/${section.sectionId}/${question.name}`}>{question.label} <span data-complete="true"></span></a></li>)
        })}
      </ul>
    </details>
  )
}
export default Section