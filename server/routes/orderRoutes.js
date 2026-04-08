
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure this exists

router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  const query = `
    SELECT oi.*, p.name, p.image
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `;

  db.query(query, [orderId], (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;