const Employee = require("../../models/employee");
const { mintEmployee } = require("../../index");
const { constants } = require("ethers");

const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { name, empCode, email } = req.body.empDetail;
    const employee = await Employee.findOne({
      "empDetail.empCode": req.body.empDetail.empCode,
    });
    if (employee) {
      console.log("This Employee is already exists");
      return res.status(404).json("This Employee is already exists");
    }
    const emp_resp = await Employee.create(req.body);
    res.status(200).json(emp_resp);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { createEmployee };
