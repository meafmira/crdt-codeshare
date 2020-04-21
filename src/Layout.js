import React from "react";

import "./Layout.css";

export function Layout({ editor, sandbox }) {
  return (
    <div className="layout">
      <div className="editorSlot">{editor}</div>
      <div className="separator"></div>
      <div className="sandboxSlot">{sandbox}</div>
    </div>
  );
}
