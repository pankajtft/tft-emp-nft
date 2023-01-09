require("dotenv").config();
const { ethers } = require("ethers");
const address = require("../client/pages/contract-constants/addresses.json")
  .EMS[31337];
const abi = require("../client/pages/contract-constants/abi.json_EMS.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);

var signer = new ethers.Wallet(process.env.POLY_PRIVATE_KEY, provider);

const contract = new ethers.Contract(address[0], abi, signer);

const mintEmployeeNFT = async (emp_name, emp_id, emp_email, _skills) => {
  const result = await contract.mintEmployeeNFT(
    emp_name,
    emp_id,
    emp_email,
    _skills,
    {
      gasLimit: process.env.GAS_LIMIT,
    }
  );
  const receipt = await result.wait();
  return receipt;
};

const mintEmployeeNFTwithProject = async (
  emp_name,
  emp_id,
  emp_email,
  _skills,
  _projectName,
  team_size,
  startTime,
  endTime
) => {
  const result = await contract.mintEmployeeNFTwithProject(
    emp_name,
    emp_id,
    emp_email,
    _skills,
    _projectName,
    team_size,
    startTime,
    endTime,
    {
      gasLimit: process.env.GAS_LIMIT,
    }
  );
  const receipt = await result.wait();
  return receipt;
};

const AddProject = async (
  tokenId,
  team_size,
  _projectName,
  startTime,
  endTime
) => {
  // console.log(contract);
  const result = await contract.AddProject(
    tokenId,
    team_size,
    _projectName,
    startTime,
    endTime,
    {
      gasLimit: process.env.GAS_LIMIT,
    }
  );
  const receipt = await result.wait();
  return receipt;
};

const editProject = async (
  tokenId,
  _skills,
  team_size,
  _projectName,
  startTime,
  endTime,
  projectNumber
) => {
  const result = await contract.editProject(
    tokenId,
    _skills,
    team_size,
    _projectName,
    startTime,
    endTime,
    projectNumber,
    {
      gasLimit: process.env.GAS_LIMIT,
    }
  );
  const receipt = await result.wait();
  return receipt;
};

const skillsUpdate = async (tokenId, _skills) => {
  const result = await contract.skillUpdate(tokenId, _skills, {
    gasLimit: process.env.GAS_LIMIT,
  });
  const receipt = await result.wait();
  return receipt;
};

const setCurrentProject = async (tokenId, projectID) => {
  const result = await contract.setCurrentProject(tokenId, projectID, {
    gasLimit: process.env.GAS_LIMIT,
  });
  const receipt = await result.wait();
  return receipt;
};

const burnProject = async (tokenId, projectNumber) => {
  const result = await contract.burnProject(tokenId, projectNumber, {
    gasLimit: process.env.GAS_LIMIT,
  });
  const receipt = await result.wait();
  return receipt;
};

const burn = async (tokenId) => {
  const result = await contract.burn(tokenId, {
    gasLimit: process.env.GAS_LIMIT,
  });
  const receipt = await result.wait();
  return receipt;
};

module.exports = {
  mintEmployeeNFT,
  mintEmployeeNFTwithProject,
  AddProject,
  skillsUpdate,
  setCurrentProject,
  editProject,
  burnProject,
  burn,
};
