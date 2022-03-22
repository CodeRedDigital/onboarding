import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { decode } from "he";
import parse from "html-react-parser";

// components
import Main from "../components/Main"

// states
import StateContext from "../states/StateContext";
import DispatchContext from "../states/DispatchContext";
import Link from "next/link";
export default function Credas() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const router = useRouter();
  const credasContent = parse(decode(appState.firm.modalContent.credas))
  useEffect(() => {
    
  },[])
  return (
    <Main title="CREDAS">
      <button className="btn primary" onClick={() => router.back()}>Back</button>
      <h1>About CREDAS</h1>
      {credasContent}
    </Main>
  )
}