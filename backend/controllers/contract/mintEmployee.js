const Employee = require("../../models/employee");
const { mintEmployeeNFT, mintEmployeeNFTwithProject } = require("../../index");
const { storeTransaction } = require("./helpers");
const mongoose = require("mongoose");
const moment = require("moment");
const { ethers } = require("ethers");

const mintEmployee = async (req, res) => {
  try {
    const queryId = mongoose.Types.ObjectId(req.params.id);
    const employee = await Employee.findById(queryId);

    const { name, empCode, email, skills } = employee.empDetail;
    let contract_response = await mintEmployeeNFT(
      name,
      email,
      skills.join(","),
      empCode
    );

    storeTransaction(
      queryId,
      contract_response.transactionHash,
      contract_response.events[1].event,
      ethers.utils.formatEther(
        contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
      )
    );
    await Employee.findByIdAndUpdate(employee._id, {
      "empDetail.isSkillSynced": true,
      "minted":true
    });
    res.status(200).send("NFT minted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  mintEmployee,
};
