import express from "express";
import "dotenv/config";
import { connectDb } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path";
import job from "./lib/cron.js";
import clerkRouter from "./webhooks/clerk.webhook.js";
import authRouter from "./routes/auth.route.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 5000;

const publicDir = path.join(process.cwd(), "public");

app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkRouter,
);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({ message: "Hello from the backend!", ok: true });
});

// Serve static files from public/ directory. This is for production only.
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port", PORT);

  if (process.env.NODE_ENV === "production") job.start();
});

//VPtuaPfxLDjPTGx8
