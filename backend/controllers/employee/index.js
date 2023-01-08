const { createEmployee } = require("./createEmployee");
const { updateEmployee } = require("./updateEmployee");
const { getAllEmployees } = require("./getAllEmployees");
const { deleteEmployee } = require("./deleteEmployee");
const { skillUpdate } = require("./skillUpdate");

module.exports = {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployee,
  skillUpdate,
};
