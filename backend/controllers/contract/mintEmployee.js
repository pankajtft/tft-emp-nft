const Employee = require("../../models/employee");
const { mintEmployeeNFT, mintEmployeeNFTwithProject } = require("../../index");
const { storeTransaction } = require("./helpers");
const mongoose = require("mongoose");
const moment = require("moment");

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
        Number(contract_response.gasUsed._hex)
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
        Number(contract_response.gasUsed._hex)
      );
    }
    res.status(200).send(contract_response);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  mintEmployee,
};
