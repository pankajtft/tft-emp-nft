const Employee = require("../../models/employee");
const { AddProject } = require("../../index");
const { storeTransaction } = require("../contract/helpers");
const mongoose = require("mongoose");

const updateEmployee = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const updates = req.body.projDetails[0];
  console.log("updates", updates);
  console.log(queryId, updates);
  const employee = await Employee.findByIdAndUpdate(queryId, {
    $push: { projDetails: updates },
  });

  const contract_response = await AddProject(
    employee.tokenId,
    updates.teamSize,
    updates.projectName,
    updates.projectStartDate.toString(),
    updates.projectEndDate.toString(),
    employee.projDetails.length
  );
  storeTransaction(
    queryId,
    contract_response.transactionHash,
    contract_response.events[0].event,
    contract_response.gasUsed.hex
  );
  res.status(200).send(contract_response);
};

module.exports = { updateEmployee };
