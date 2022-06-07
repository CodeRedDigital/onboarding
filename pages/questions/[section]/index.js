import { useRouter } from "next/router";

// components
import Main from "../../../components/Main";

function Section() {
  const router = useRouter()
  const sectionName = router.query.section
  return (
    <Main>
      <h1>This section is {sectionName}</h1>
      <p>List of questions goes here</p>
    </Main>
  )
}

export default Section