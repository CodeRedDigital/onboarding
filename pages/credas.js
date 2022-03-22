import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { decode } from "he";
import parse from "html-react-parser";

// components
import Main from "../components/Main"

// states
import StateContext from "../states/StateContext";
export default function Credas() {
  const appState = useContext(StateContext);
  const router = useRouter();
  return (
    <Main title="CREDAS">
      <button className="btn primary" onClick={() => router.back()}>Back</button>
      <h1>About CREDAS</h1>
      {appState.app.firmData === "success" &&
        parse(decode(appState.firm.modalContent.credas))
      }
    </Main>
  )
}