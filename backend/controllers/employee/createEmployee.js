const Employee = require("../../models/employee");

const createEmployee = async (
  _empId,
  _employeeName,
  email,
  skills,
  team_size,
  _projectName,
  startTime,
  endTime,
  tokenId
) => {
  const employee = await Employee.findOne({ employee_code: _empId });
  console.log(employee);
  if (employee) {
    console.log("This Employee is already exists");
    return;
  }
  const new_employee = new Employee({
    _empId: _empId,
    _employeeName: _employeeName,
    email: email,
    skills: skills.split(","),
    tokenId: tokenId,
    projects: [
      {
        project_name: _projectName,
        project_start_date: startTime,
        project_end_date: endTime,
        team_size: team_size,
      },
    ],
  });

  new_employee.save((err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
    }
  });
};

module.exports = { createEmployee };
