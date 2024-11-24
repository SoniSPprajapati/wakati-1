import { Hono } from "hono";

const app = new Hono();

// Health Route
app.get("/status", (c) => {
  return c.json({ message: "Service is running. 🚀" });
});

app.get("/", (c) => {
  return c.html(`<h1>Wakati API!</h1>`);
});

app.get("/api/calculate", (c) => {
  const text = c.req.query("text");
  const wpm = c.req.query("wpm");

  return c.json({ message: text, wpm });
});

export default app;
