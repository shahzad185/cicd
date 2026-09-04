import express from "express";

export function createApp() {
  const app = express();

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/greet/:name", (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}!` });
  });

  return app;
}
