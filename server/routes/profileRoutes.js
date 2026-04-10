const { Router } = require("express");
const { getProfile, upsertProfile } = require("../controllers/profileController");

const router = Router();
router.get("/", getProfile);
router.put("/", upsertProfile);

module.exports = router;