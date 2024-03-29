const Employee = require("../../models/employee");
const mongoose = require("mongoose");
const { burn } = require("../../index");
const { storeTransaction } = require("../contract/helpers");
const { ethers } = require("ethers");

const deleteEmployee = async (req, res) => {
  try {
    const queryId = mongoose.Types.ObjectId(req.params.id);
    const updates = {
      isActive: false,
      isDeleted: true,
    };
    const employee = await Employee.findByIdAndUpdate(queryId, updates);
     let contract_response = await burn(employee?.empDetail?.empCode);
      storeTransaction(
        queryId,
        contract_response.transactionHash,
        contract_response.events[1].event,
        ethers.utils.formatEther(
          contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
        )
      );

    res.status(200).send("NFT burned successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { deleteEmployee };
