const Employee = require("../../models/employee");

const getEmployee = async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId(req.params.id);
    const emp_data = await Employee.find({
      _id: _id,
      isDeleted: false,
      isActive: true,
    });
    res.status(200).send(emp_data);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { getEmployee };
