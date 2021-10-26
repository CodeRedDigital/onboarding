/* eslint-disable @next/next/no-img-element */
import React, {useContext} from "react";

import StateContext from "../states/StateContext"; // passes the initial state
function Header() {
  const appState = useContext(StateContext);
  return (
    <header>
      {appState.app.firmData === "success" ? <img
      src={`/images/logos/${appState.firm.logos.colourSvg}`}
      alt={appState.firm.Name}
    /> : ""}
    </header>
  )
}

export default Header