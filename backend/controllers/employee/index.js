const { createEmployee } = require("./createEmployee");
const { updateEmployee } = require("./updateEmployee");
const { getAllEmployees } = require("./getAllEmployees");
const { deleteEmployee } = require("./deleteEmployee");
const { skillUpdate } = require("./skillUpdate");
const { editProject } = require("./editProject");

module.exports = {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
  skillUpdate,
  editProject,
};
