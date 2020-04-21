import React from "react";
import { Layout } from "./Layout";
import { Editor } from "./Editor";
import { Sandbox } from "./Sandbox";

import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "./App.css";

function App() {
  const editor = <Editor />;
  const sandbox = <Sandbox />;

  return <Layout editor={editor} sandbox={sandbox} />;
}

export default App;
