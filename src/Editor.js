import React, { useRef, useEffect } from "react";
import CodeMirror from "codemirror";

import "./Editor.css";

export function Editor({
  onCodeChange,
  onChanges,
  onChange,
  value,
  doNotUpdate,
}) {
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
      const handleChanges = (state, events) => {
        if (onChanges) {
          onChanges(events, state);
        }

        events.forEach((event) => {
          if (onCodeChange) {
            onCodeChange(codeMirrorRef.current.doc.getValue());
          }

          if (onChange) {
            onChange(event, state);
          }
        });
      };
      codeMirrorRef.current.on("changes", handleChanges);

      return () => codeMirrorRef.current.off("changes", handleChanges);
    }
  }, [onChange, onChanges, onCodeChange]);

  useEffect(() => {
    if (codeMirrorRef.current) {
      const prevValue = codeMirrorRef.current.doc.getValue();

      if (prevValue !== value && !doNotUpdate) {
        codeMirrorRef.current.doc.setValue(value);
      } else {
      }
    }
  }, [doNotUpdate, value]);

  return <div className="editor" ref={editorRef}></div>;
}
