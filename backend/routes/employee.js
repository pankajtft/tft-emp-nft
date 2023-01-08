const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  skillUpdate,
} = require("../controllers/employee");

router.get("/", getAllEmployees);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.patch("/skillUpdate/:id", skillUpdate);

module.exports = router;
