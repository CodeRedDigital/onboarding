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
    <div className="loading">
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Page

// Usage instructions:
/* 
At the top of the file you need to import this file:
  import Page from "./Page";
This component will create an Page element that is a parent for the other elements,
it also allows you to set the title tag for the page:
To use it enter:
  <Page title="Whatever you want the Title to be">
    // child elements
  </Page>
  For example:
  <Page id="email" label="Email Address" type="email" />
*/

