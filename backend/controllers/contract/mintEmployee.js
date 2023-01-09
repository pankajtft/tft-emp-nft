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
    let contract_response;

    if (!employee.projDetails.length) {
      contract_response = await mintEmployeeNFT(
        name,
        empCode,
        email,
        skills.join(",")
      );
      
      storeTransaction(
        queryId,
        contract_response.transactionHash,
        contract_response.events[1].event,
        ethers.utils.formatEther(
          contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
        )
      );
    } else {
      const {
        projectName,
        teamSize,
        projectStartDate,
        projectEndDate,
        designation,
      } = employee.projDetails[0];
      contract_response = await mintEmployeeNFTwithProject(
        name,
        empCode,
        email,
        skills.join(","),
        projectName,
        teamSize,
        moment(projectStartDate).format("DD/MM/YYYY"),
        moment(projectEndDate).format("DD/MM/YYYY")
      );
      storeTransaction(
        queryId,
        contract_response.transactionHash,
        contract_response.events[1].event,
        ethers.utils.formatEther(
          contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
        )
      );
    }
    res.status(200).send("NFT minted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  mintEmployee,
};
