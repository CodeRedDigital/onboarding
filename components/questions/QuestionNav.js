import { useRouter } from 'next/router'

function QuestionNav(props) {
  const router = useRouter()
  const prevPath = `/questions/${props.prev}`
  const homePath = `/questions`
  const nextPath = `/questions/${props.next}`
  const handleClick = (event) => {
    event.preventDefault()
    console.log(event.target.dataset.path)
    if(event.target.dataset.path){
      console.log("Navigating")
      router.push(event.target.dataset.path)
    }
  }
  console.log(`Prev - ${props.prev} Next - ${props.next}`)
  return (
    <nav id="navigation">
      <button onClick={handleClick} data-path={prevPath} className="btn secondary">back</button>
      <button onClick={handleClick} data-path={homePath} className="btn primary">home</button>
      <button onClick={handleClick} data-path={nextPath} className="btn secondary">next</button>
    </nav>
  )
}

export default QuestionNav