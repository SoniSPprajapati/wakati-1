import { Hono } from "hono";

const app = new Hono();

let defaultWPM = 238;

function calculateReadingTime(sentence: string, wpm: number) {
  const wordCount: number = sentence.split(/\s+/).length;
  const minutes: number = wordCount / wpm;
  const seconds: number = minutes * 60;
  return {
    wordCount,
    minutes: Number(minutes.toFixed(2)),
    seconds: Number(seconds.toFixed(2)),
    wpm,
  };
}

// === Routes ===
app.get("/status", (c) => {
  return c.json({ message: "API is active 🚀", status: "ok" });
});

app.get("/", (c) => {
  const sentence = c.req.query("sentence");
  const wpm = c.req.query("wpm"); // Optional

  if (!sentence) {
    return c.json({ message: "Field sentence is required" }, 400);
  }

  const readingTime = calculateReadingTime(sentence, Number(wpm) || defaultWPM);

  return c.json({ readingTime });
});

export default app;
