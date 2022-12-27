const Employee = require("../../models/employee");

const getAllEmployees = async (req, res) => {
  try {
    const emp_data = await Employee.find({
      isDeleted: false,
      isActive: true,
    });
    res.status(200).send(emp_data);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { getAllEmployees };
