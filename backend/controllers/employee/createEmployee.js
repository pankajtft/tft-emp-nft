const Employee = require("../../models/employee");

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      "empDetail.empCode": req.body.empDetail.empCode,
    });
    if (employee) {
      return res.status(404).json("This Employee is already exists");
    }
    const emp_resp = await Employee.create(req.body);
    res.status(200).json(emp_resp);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { createEmployee };
