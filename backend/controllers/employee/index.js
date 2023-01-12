const { createEmployee } = require("./createEmployee");
const { addNewProject } = require("./addNewProject");
const { getAllEmployees } = require("./getAllEmployees");
const { deleteEmployee } = require("./deleteEmployee");
const { skillUpdate } = require("./skillUpdate");
const { editProject } = require("./editProject");
const { getEmployee } = require("./getEmployee");

module.exports = {
  createEmployee,
  addNewProject,
  getAllEmployees,
  deleteEmployee,
  skillUpdate,
  editProject,
  getEmployee,
};
