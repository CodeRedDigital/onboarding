import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { decode } from "he";
import parse from "html-react-parser";

// components
import Main from "../components/Main"

// states
import StateContext from "../states/StateContext";
import DispatchContext from "../states/DispatchContext";

export default function Thirdfort() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const router = useRouter();
  const thirdfortContent = parse(decode(appState.firm.modalContent.thirdfort))
  useEffect(() => {
    
  },[])
  return (
    <Main title="Thirdfort">
      <button className="btn primary" onClick={() => router.back()}>Back</button>
      <h1>About Thirdfort</h1>
      {thirdfortContent}
    </Main>
  )
}