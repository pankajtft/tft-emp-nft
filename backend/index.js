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
    // {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

// const mintEmployeeNFTwithProject = async (
//   emp_name,
//   emp_id,
//   emp_email,
//   _skills,
//   _projectName,
//   team_size,
//   startTime,
//   endTime
// ) => {
//   const result = await FactoryContractEthers.mintEmployeeNFTwithProject(
//     emp_name,
//     emp_id,
//     emp_email,
//     _skills,
//     _projectName,
//     team_size,
//     startTime,
//     endTime
//     // {
//     //   gasLimit: process.env.GAS_LIMIT,
//     // }
//   );
//   const receipt = await result.wait();
//   return receipt;
// };

const AddProject = async (
  tokenId,
  team_size,
  projectName,
  startTime,
  endTime
) => {
  // console.log(contract);
  const result = await FactoryContractEthers.AddProject(
    tokenId,
    team_size,
    projectName,
    startTime,
    endTime
    // {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const editProject = async (
  tokenId,
  team_size,
  projectName,
  startTime,
  endTime,
  projectNumber
) => {
  const result = await FactoryContractEthers.editProject(
    tokenId,
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

const skillsUpdate = async (tokenId, skills) => {
  const result = await FactoryContractEthers.skillUpdate(
    tokenId,
    skills
    //   {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const setCurrentProject = async (tokenId, projectID) => {
  const result = await FactoryContractEthers.setCurrentProject(
    tokenId,
    projectID
    //    {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const burnProject = async (tokenId, projectNumber) => {
  const result = await FactoryContractEthers.burnProject(
    tokenId,
    projectNumber
    //   {
    //   gasLimit: process.env.GAS_LIMIT,
    // }
  );
  const receipt = await result.wait();
  return receipt;
};

const burn = async (tokenId) => {
  const result = await FactoryContractEthers.burn(
    tokenId
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
