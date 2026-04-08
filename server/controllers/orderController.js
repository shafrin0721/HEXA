const db = require("../config/db");

// GET order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
};

// CREATE order
exports.createOrder = (req, res) => {
  const { total, user_name } = req.body;

  const sql = "INSERT INTO orders (total, user_name) VALUES (?, ?)";

 db.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
  if (err) return res.status(500).json(err);

  if (result.length === 0) {
    return res.json({ message: "No order found" });
  }

  res.json(result[0]);
});


db.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
  if (err) return res.status(500).json(err);

  if (result.length === 0) {
    return res.json({ message: "No order found" });
  }

  res.json(result[0]);
})}