const Employee = require("../../models/employee");

const getAllEmployees = async (req, res) => {
  const emp_data = await Employee.find({});
  res.status(200).send(emp_data);
};

module.exports = { getAllEmployees };
