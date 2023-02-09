const { FactoryContractEthers } = require("./server");

// require("dotenv").config();
// const { ethers } = require("ethers");
// const address = require("../client/pages/contract-constants/addresses.json")
//   .EMS[31337];
// const abi = require("../client/pages/contract-constants/abi.json_EMS.json");

// const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);

// var signer = new ethers.Wallet(process.env.POLY_PRIVATE_KEY, provider);

// const contract = new ethers.Contract(address[0], abi, signer);
// console.log("contract", FactoryContractEthers);

const mintEmployeeNFT = async (employeeName, email, skills, empId) => {
  console.log(employeeName, email, skills, empId);
  const result = await FactoryContractEthers.mintEmployeeNFT(
    employeeName,
    email,
    skills,
    empId
  );
  const receipt = await result.wait();
  return receipt;
};

const AddProject = async (
  empId,
  team_size,
  projectName,
  startTime,
  endTime
) => {
  // console.log(contract);
  const result = await FactoryContractEthers.AddProject(
    empId,
    team_size,
    projectName,
    startTime,
    endTime
  );
  const receipt = await result.wait();
  return receipt;
};

const editProject = async (
  empId,
  team_size,
  projectName,
  startTime,
  endTime,
  projectNumber
) => {
  const result = await FactoryContractEthers.editProject(
    empId,
    team_size,
    projectName,
    startTime,
    endTime,
    projectNumber
    // {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const skillsUpdate = async (empId, skills) => {
  const result = await FactoryContractEthers.skillUpdate(
    empId,
    skills
    //   {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const setCurrentProject = async (empId, projectID) => {
  const result = await FactoryContractEthers.setCurrentProject(
    empId,
    projectID
    //    {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const burnProject = async (empId, projectNumber) => {
  const result = await FactoryContractEthers.burnProject(
    empId,
    projectNumber
    //   {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const burn = async (empId) => {
  const result = await FactoryContractEthers.burn(
    empId

    //   {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

module.exports = {
  mintEmployeeNFT,
  // mintEmployeeNFTwithProject,
  AddProject,
  skillsUpdate,
  setCurrentProject,
  editProject,
  burnProject,
  burn,
};
