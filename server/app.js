import { createRequire } from "module";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const require = createRequire(import.meta.url);
const ordersRoutes = require("./routes/orders.cjs");
const paymentsRoutes = require("./routes/payments.cjs");

dotenv.config({ override: true });

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(",").map((s) => s.trim()) : true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/orders", ordersRoutes);
app.use("/api", paymentsRoutes);

app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Unexpected server error" });
});

export default app;
