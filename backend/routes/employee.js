const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  skillUpdate,
  editProject,
  getEmployee,
} = require("../controllers/employee");

router.get("/", getAllEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.patch("/skillUpdate/:id", skillUpdate);
router.patch("/projectUpdate/:id/:projId", editProject);
module.exports = router;
