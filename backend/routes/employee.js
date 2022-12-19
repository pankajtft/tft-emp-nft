const express = require("express");
const router = express.Router();
const { getAllEmployees } = require("../controllers/employee");

router.get("/", getAllEmployees);

module.exports = router;
