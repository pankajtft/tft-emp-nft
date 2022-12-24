const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
} = require("../controllers/employee");

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);

module.exports = router;
