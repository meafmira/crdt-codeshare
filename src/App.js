import React from "react";
import logo from "./logo.svg";
import { Layout } from "./Layout";
import { Editor } from "./Editor";

import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "./App.css";

function App() {
  const editor = <Editor />;

  return <Layout editor={editor} />;
}

export default App;
