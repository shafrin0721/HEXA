
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure db.js exists

// GET order by ID
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT 
      oi.id,
      oi.order_id,
      oi.product_id,
      oi.quantity,
      oi.price,
      p.name,
      p.image
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `;

  db.query(query, [orderId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

module.exports = router;