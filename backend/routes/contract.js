const express = require("express");
const router = express.Router();

const { mintEmployee } = require("../controllers/contract");

router.get("/mintEmployee/:id", mintEmployee);

module.exports = router;
