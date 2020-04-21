import React, { useRef, useEffect } from "react";
import CodeMirror from "codemirror";

import "./Editor.css";

export function Editor({ onCodeChange }) {
  const editorRef = useRef();
  const codeMirrorRef = useRef();

  useEffect(() => {
    const codeMirror = CodeMirror(editorRef.current, {
      mode: "javascript",
      lineNumbers: true,
      theme: "monokai",
    });

    codeMirrorRef.current = codeMirror;
  }, []);

  useEffect(() => {
    if (codeMirrorRef.current) {
      const handleChange = () => {
        if (onCodeChange) {
          onCodeChange(codeMirrorRef.current.doc.getValue());
        }
      };

      codeMirrorRef.current.on("change", handleChange);

      return () => codeMirrorRef.current.off("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (codeMirrorRef.current) {
      const handleCursorActivity = console.log;
      codeMirrorRef.current.on("cursorActivity", handleCursorActivity);

      return () =>
        codeMirrorRef.current.off("cursorActivity", handleCursorActivity);
    }
  }, []);

  return <div className="editor" ref={editorRef}></div>;
}
