const express = require("express");
const router = express.Router();

const { getAllAdmin, addAdmin } = require("../controllers/admin");

router.get("/", getAllAdmin);
router.post("/", addAdmin);

module.exports = router;
