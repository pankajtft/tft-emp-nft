const Employee = require("../../models/employee");
const { AddProject } = require("../../index");
const { storeTransaction } = require("../contract/helpers");
const mongoose = require("mongoose");

const updateEmployee = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const updates = req.body.projDetails[0];
  const employee = await Employee.findByIdAndUpdate(queryId, {
    $push: { projDetails: updates },
  });

  const contract_response = await AddProject(
    employee.tokenId,
    updates.teamSize,
    updates.projectName,
    updates.projectStartDate.toString(),
    updates.projectEndDate.toString(),
  );
  storeTransaction(
    queryId,
    contract_response.transactionHash,
    contract_response.events[0].event,
    Number(contract_response.gasUsed._hex)
  );
  res.status(200).send(contract_response);
};

module.exports = { updateEmployee };
