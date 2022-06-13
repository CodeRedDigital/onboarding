import { useEffect } from 'react'

// components

import Header from './Header'
import Footer from './Footer'

function QuestionsPage(props) {
  useEffect(() => {
    document.title = `Onboarding | ${props.title}`
    window.scrollTo(0,0)
  }, [props.title])
  return (
    <div className="loaded">
      <Header />
      <main className="question">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default QuestionsPage