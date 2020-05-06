import React from "react";

import "./Loader.css";

export function Loader() {
  return (
    <div className="lds-container">
      <div className="lds-ring">
        <div /> <div /> <div /> <div />
      </div>
      <div className="lds-label">Connecting to server...</div>
    </div>
  );
}
