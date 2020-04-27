import { combineReducers } from "redux";

import { editorReducer } from "./editorReducer";

export const reducer = combineReducers({
  editor: editorReducer,
});
