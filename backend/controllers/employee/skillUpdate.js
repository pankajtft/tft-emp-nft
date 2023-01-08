const Employee = require("../../models/employee");
const { skillsUpdate } = require("../../index");
const { storeTransaction } = require("../contract/helpers");
const mongoose = require("mongoose");

const skillUpdate = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const updates = req.body.skills;
  console.log(queryId, updates);
  const employee = await Employee.findByIdAndUpdate(queryId, {
    "empDetail.skills": updates,
  });

  const contract_response = await skillsUpdate(
    employee.tokenId,
    updates.join(",")
  );
  storeTransaction(
    queryId,
    contract_response.transactionHash,
    contract_response.events[0].event,
    Number(contract_response.gasUsed._hex)
  );
  res.status(200).send(contract_response);
};

module.exports = { skillUpdate };
