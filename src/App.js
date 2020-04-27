import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSubscription } from "@logux/redux";
import { nanoid } from "nanoid";

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
  const editorIdRef = useRef();
  useLayoutEffect(() => {
    editorIdRef.current = nanoid();
  }, []);

  const [code, setCode] = useState();

  const { sessionId } = useParams();

  const isSubscribing = useSubscription([`session/${sessionId}`]);
  const value = useSelector((state) => state.editor.value);
  const doNotUpdate = useSelector(
    (state) => state.editor.changeReason === editorIdRef.current
  );

  const dispatch = useDispatch();

  const handleChanges = useCallback(
    (events, state) => {
      function handleEvent(event) {
        const { origin, ...payload } = event;

        if (!["+input", "+delete", "setValue", "paste"].includes(origin)) {
          return;
        }

        const type = `editor/${origin}`;
        const action = {
          type,
          payload: {
            ...payload,
            sessionId,
            editorId: editorIdRef.current,
          },
        };

        dispatch.sync(action);
        // dispatch(action);
      }

      batch(() => {
        events.forEach(handleEvent);
      });
    },
    [dispatch]
  );

  const handleValueChange = useCallback(
    (value) => {
      setCode(value);
      dispatch.sync({
        type: "editor/updateValue",
        payload: { value, sessionId },
      });
    },
    [dispatch]
  );

  if (isSubscribing) return null;

  const editor = (
    <Editor
      value={value}
      onChanges={handleChanges}
      doNotUpdate={doNotUpdate}
      onCodeChange={handleValueChange}
    />
  );
  const sandbox = <Sandbox code={code} />;

  return <Layout editor={editor} sandbox={sandbox} />;
}

export default App;
