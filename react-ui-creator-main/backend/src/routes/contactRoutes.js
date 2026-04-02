import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }
  try {
    const [result] = await pool.execute(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), message.trim()]
    );
    return res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("contact insert", err);
    return res.status(500).json({ error: "Could not save message" });
  }
});

export default router;
