const { Server } = require("@logux/server");
const express = require("express");

const PORT = process.env.PORT || 31337;

const server = express()
  .use(express.static("../build/"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const loguxServer = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    root: __dirname,
    server,
  })
);

const Sessions = new Map();

loguxServer.channel("session/:id", {
  access(ctx) {
    return true;
  },
  async load(ctx) {
    const sessionId = ctx.params.id;

    if (!Sessions.has(sessionId)) {
      Sessions.set(sessionId, {
        value:
          "// use `echo` function for console output\n// example: `echo('Hello, world')`\n",
      });
    }

    ctx.sendBack({
      type: "editor/init",
      payload: Sessions.get(sessionId),
    });
  },
});

loguxServer.type("editor/+input", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});
loguxServer.type("editor/+delete", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});
loguxServer.type("editor/setValue", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    Sessions.set(action.payload.sessionId, action.payload.value);
    return { channel: `session/${action.payload.sessionId}` };
  },
});

loguxServer.type("editor/paste", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});

loguxServer.type("editor/updateValue", {
  access() {
    return true;
  },
  process(ctx, action, meta) {
    Sessions.set(action.payload.sessionId, { value: action.payload.value });
  },
});

loguxServer.auth(async (userId, token) => {
  return userId === "default";
});

loguxServer.listen();
