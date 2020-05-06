const editorInitialState = {
  value: "// use `echo` function for console output",
};

export function editorReducer(state = editorInitialState, action) {
  switch (action.type) {
    case "editor/init": {
      return { ...state, value: action.payload.value };
    }
    case "editor/setValue": {
      return state;
    }
    case "editor/+input":
    case "editor/+delete":
    case "editor/paste": {
      const { from, to, removed, text } = action.payload;
      const { value, doc } = state;

      const lines = value.split("\n");

      const changedLines = lines.slice(from.line, to.line + 1);

      if (from.line !== to.line) {
        let firstLine = changedLines[0];
        firstLine =
          firstLine.substring(0, from.ch) +
          firstLine.substring(from.ch).replace(removed[0], text[0]);

        let lastLine = changedLines[changedLines.length - 1];
        lastLine =
          lastLine
            .substring(0, to.ch)
            .replace(removed[removed.length - 1], text[text.length - 1]) +
          lastLine.substring(to.ch);

        const newLines = lines
          .slice(0, from.line)
          .concat([firstLine])
          .concat(text.slice(1, text.length - 1))
          .concat(removed[0] === "" ? [] : [lastLine])
          .concat(lines.slice(to.line + 1));

        const newValue = newLines.join("\n");

        return { ...state, value: newValue };
      }

      const joinedText = text.join("\n");

      lines[from.line] =
        lines[from.line].substring(0, from.ch) +
        lines[from.line]
          .substring(from.ch, to.ch)
          .replace(removed[0], joinedText) +
        lines[from.line].substring(to.ch);

      const newValue = lines.join("\n");

      return {
        ...state,
        value: newValue,
        changeReason: action.payload.editorId,
      };
    }

    default:
      return state;
  }

  return state;
}
