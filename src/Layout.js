import React, { useState, useRef, useEffect } from "react";

import "./Layout.css";

export function Layout({ editor, sandbox }) {
  const editorSlotRef = useRef();
  const sandboxSlotRef = useRef();
  const layoutRef = useRef();

  const [editorWidth, setEditorWidth] = useState();

  return (
    <div className="layout" ref={layoutRef}>
      <div className="editorSlot" ref={editorSlotRef}>
        {editor}
      </div>
      <div className="separator"></div>
      <div className="sandboxSlot" ref={sandboxSlotRef}>
        {sandbox}
      </div>
    </div>
  );
}
