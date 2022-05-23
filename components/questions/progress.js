function Progress(props) {
  return (
    <>
      <progress id={props.sectionId} max={props.questions} value={props.answered}>{props.answered}/{props.questions}</progress>
      <label htmlFor={props.sectionId}>{props.answered}/{props.questions}</label>
    </>
  )
}

export default Progress