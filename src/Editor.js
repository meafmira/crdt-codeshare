import React, { useRef, useEffect } from "react";
import CodeMirror from "codemirror";

import "./Editor.css";

export function Editor() {
  const editorRef = useRef();

  useEffect(() => {
    const editor = CodeMirror(editorRef.current, {
      mode: "javascript",
      lineNumbers: true,
      theme: "monokai",
    });

    editor.on("change", console.log);
  }, []);

  return <div className="editor" ref={editorRef}></div>;
}
