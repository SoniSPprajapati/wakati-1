import { Hono } from "hono";

const app = new Hono();

let defaultWPM = 238;

function calculateReadingTime(sentence: string, wpm: number) {
  const wordCount: number = sentence.split(/\s+/).length;
  const minutes: number = wordCount / wpm;
  const seconds: number = minutes * 60;
  return {
    wordCount,
    minutes,
    seconds,
    wpm,
  };
}

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
