const Employee = require("../../models/employee");

const addNewProject = async (tokenId, _projectName, startTime, endTime) => {
  const employeeProject = await Employee.find({
    projects: { $elemMatch: { project_name: _projectName } },
  });
  console.log("employeeProject", employeeProject);
  if (employeeProject) {
    console.log("This Project is already exists for this employee");
    return;
  } else {
    const employee = await Employee.updateOne(
      { tokenId: tokenId },
      {
        $push: {
          projects: {
            project_name: _projectName,
            project_start_date: startTime,
            project_end_date: endTime,
          },
        },
      }
    );
    console.log(employee);
  }
};

module.exports = { addNewProject };