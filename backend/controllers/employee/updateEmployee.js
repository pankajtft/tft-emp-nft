const Employee = require("../../models/employee");
const mongoose = require("mongoose");

const updateEmployee = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const updates = req.body;
  Employee.findByIdAndUpdate(queryId, updates, (err, item) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(item);
    }
  });
};

module.exports = { updateEmployee };
