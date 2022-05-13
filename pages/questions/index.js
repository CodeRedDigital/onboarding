import { useRouter } from "next/router";

function QuestionsHome() {
  const router = useRouter()
  const sectionName = router.query.section
  return <h1>Questions Home</h1>
}

export default QuestionsHome