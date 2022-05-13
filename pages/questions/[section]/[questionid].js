import { useRouter } from "next/router";

function Question() {
  const router = useRouter()
  const questionName = router.query.question
  return <h1>This question is {questionName}</h1>
}

export default Question