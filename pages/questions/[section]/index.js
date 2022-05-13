import { useRouter } from "next/router";

function Section() {
  const router = useRouter()
  const sectionName = router.query.section
  return <h1>This section is {sectionName}</h1>
}

export default Section