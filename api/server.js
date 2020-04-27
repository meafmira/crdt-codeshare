const { Server } = require("@logux/server");

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    root: __dirname,
  })
);

const Sessions = new Map();

server.channel("session/:id", {
  access(ctx) {
    return true;
  },
  async load(ctx) {
    const sessionId = ctx.params.id;

    if (!Sessions.has(sessionId)) {
      Sessions.set(sessionId, { value: "" });
    }

    ctx.sendBack({
      type: "editor/init",
      payload: Sessions.get(sessionId),
    });
  },
});

server.type("editor/+input", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});
server.type("editor/+delete", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});
server.type("editor/setValue", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    Sessions.set(action.payload.sessionId, action.payload.value);
    return { channel: `session/${action.payload.sessionId}` };
  },
});

server.type("editor/paste", {
  access() {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `session/${action.payload.sessionId}` };
  },
});

server.type("editor/updateValue", {
  access() {
    return true;
  },
  process(ctx, action, meta) {
    Sessions.set(action.payload.sessionId, { value: action.payload.value });
  },
});

server.auth(async (userId, token) => {
  return userId === "default";
});

server.listen();
