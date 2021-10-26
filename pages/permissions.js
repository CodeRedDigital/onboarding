import { useContext, useEffect } from 'react'
import Script from 'next/script'
import { decode } from "he" // used for decoding the encoded html for the modal
import parse from 'html-react-parser'

// components
import Main from '../components/Main'
import ModalButton from '../components/ModalButton'

// states
import StateContext from '../states/StateContext'
import DispatchContext from '../states/DispatchContext'

export default function Home() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  async function handleSubmit(event) {
    event.preventDefault();
    // here we will stored the data in local storage
    // localStorage.setItem("usersData", JSON.stringify(userData));
    await appDispatch({ type: "flashMessage", value: "Thank you for Accepting" });
    await appDispatch({ type: "agreements", user: appState.app.indexOfLoggedInUser })
    // here we will speak to the database and set the users password
    // try {
    //   await AxiosPali.post('https://pali.database/register', userData)
    // } catch (error) {
    //   console.log("there was an error")
    // }
  }
  
  return (
    <Main title="Permissions">
      <h1>Permissions</h1>
      <h2>In order to proceed you need to accept the following statements.</h2>
      <p>
        In order to proceed we need you to read and accept the GDPR Statement
        and the Terms & Conditions.
      </p>
      {appState.app.firmData === "success" &&
        <ModalButton
          name="gdpr"
          label="GDPR Statement"
          instructions="Please read carefully and Accept."
          checked={appState.user.agreed.gdpr}
          modalContent={parse(decode(appState.firm.modalContent.gdpr))}
          // modalContent="GDPR this is a paragraph"
          />
      }
      {appState.app.firmData === "success" &&
        <ModalButton
          name="tAndC"
          label="Terms & Conditions"
          instructions="Please read carefully and Accept."
          checked={appState.user.agreed.tAndC}
          // modalContent="GDPR this is a paragraph"
          modalContent={parse(decode(appState.firm.modalContent.tAndC))}
        />
      }
      <form onSubmit={handleSubmit} action="">
        <button id="next" className="btn secondary" disabled>
          Next
        </button>
      </form>
      <Script id="modal-js" src="/js/modal.js" onLoad={() => {ARIAmodal.init()}} />
      <Script id="button-js" src="/js/permButtonCheck.js" onLoad={() => {checkButtons()}} />
    </Main>
  )
}