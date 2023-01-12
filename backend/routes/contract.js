const express = require("express");
const router = express.Router();

const { mintEmployee, syncWithBlockchain } = require("../controllers/contract");

router.get("/mintEmployee/:id", mintEmployee);
router.get("/syncWithBlockchain/:id", syncWithBlockchain);

module.exports = router;
