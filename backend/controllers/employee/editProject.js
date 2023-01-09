const Employee = require("../../models/employee");

const editProject = async (req, res) => {
  try {
    // First, retrieve the project to be updated
    const employee = await Employee.findOne({
      _id: req.params.id,
      "projDetails._id": req.params.projId,
    });

    // Get the index of the project in the projDetails array
    const projectIndex = employee.projDetails.findIndex(
      (project) => project._id == req.params.projId
    );

    // Update the project with the request body data
    employee.projDetails[projectIndex] = {
      ...employee.projDetails[projectIndex],
      ...req.body,
    };

    // Save the updated employee document
    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  editProject,
};
