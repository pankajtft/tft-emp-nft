const Employee = require("../../models/employee");
const mongoose = require("mongoose");
const { burn } = require("../../index");

const deleteEmployee = async (req, res) => {
  try {
    const queryId = mongoose.Types.ObjectId(req.params.id);
    const updates = {
      isActive: false,
      isDeleted: true,
    };
    const employee = await Employee.findByIdAndUpdate(queryId, updates);
    let burnNFT;
    if (employee?.tokenId) {
      burnNFT = await burn(employee.tokenId);
    }
    res.status(200).send(burnNFT);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { deleteEmployee };
