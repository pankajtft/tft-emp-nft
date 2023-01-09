const Employee = require("../../models/employee");
const { skillsUpdate } = require("../../index");
const { storeTransaction } = require("../contract/helpers");
const mongoose = require("mongoose");
const { ethers } = require("ethers");

const skillUpdate = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const updates = req.body.skills;
  console.log(queryId, updates);
  const employee = await Employee.findByIdAndUpdate(queryId, {
    $addToSet: {
      "empDetail.skills": { $each: updates },
    },
  });
  const updated_employee = await Employee.findById(queryId);
  const contract_response = await skillsUpdate(
    employee.tokenId,
    updated_employee?.empDetail?.skills.join(",")
  );
  storeTransaction(
    queryId,
    contract_response.transactionHash,
    contract_response.events[0].event,
    ethers.utils.formatEther(
      contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
    )
  );
  res.status(200).send(updated_employee);
};

module.exports = { skillUpdate };
