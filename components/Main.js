import { useEffect } from 'react'

// components

import Header from './Header'
import Footer from './Footer'

function Page(props) {
  useEffect(() => {
    document.title = `Onboarding | ${props.title}`
    window.scrollTo(0,0)
  }, [props.title])
  return (
    <div className="loaded">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Page