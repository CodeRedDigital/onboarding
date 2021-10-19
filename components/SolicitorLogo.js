/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";

// Contexts
import StateContext from "../states/StateContext";

function SolicitorLogo() {
  const appState = useContext(StateContext);
  return (
    <img
      src={`/images/logos/${appState.firm.logos.whiteSvg}`}
      alt={appState.firm.Name}
    />
  )
}

export default SolicitorLogo