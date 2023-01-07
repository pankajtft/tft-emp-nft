const { ethers } = require("ethers");
const address = require("../client/pages/contract-constants/addresses.json")
  .EMS[31337];
const abi = require("../client/pages/contract-constants/abi.json_EMS.json");

const url = "http://127.0.0.1:8545/";
// const polyUrl =
//   "https://polygon-mumbai.g.alchemy.com/v2/ilstxE0yedAjbQEDV1TaurFfb4Po9Hyw";
// const gurl =
//   "https://eth-goerli.g.alchemy.com/v2/cNUlAyEJVafwSd6s6iAz-yXoQ3q4gtA1";
const provider = new ethers.providers.JsonRpcProvider(url);

var signer = new ethers.Wallet(
  // "0x7d674e715215ce1d7db8ea53930163c44d2ca181abe7a9d8a4a74a2a8eb43313",
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

const contract = new ethers.Contract(address[0], abi, signer);

const mintEmployeeNFT = async (emp_name, emp_id, emp_email, _skills) => {
  const result = await contract.mintEmployeeNFT(
    emp_name,
    emp_id,
    emp_email,
    _skills
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
    endTime
  );
  const receipt = await result.wait();
  return receipt;
};

const AddProject = async (
  tokenId,
  team_size,
  _projectName,
  startTime,
  endTime,
  projectNumber
) => {
  // console.log(contract);
  const result = await contract.AddProject(
    tokenId,
    team_size,
    _projectName,
    startTime,
    endTime,
    projectNumber
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
    projectNumber
  );
  const receipt = await result.wait();
  return receipt;
};

const skillUpdate = async (tokenId, _skills) => {
  const result = await contract.skillUpdate(tokenId, _skills);
  const receipt = await result.wait();
  return receipt;
};

const setCurrentProject = async (tokenId, projectID) => {
  const result = await contract.setCurrentProject(tokenId, projectID);
  const receipt = await result.wait();
  return receipt;
};

const burnProject = async (tokenId, projectNumber) => {
  const result = await contract.burnProject(tokenId, projectNumber);
  const receipt = await result.wait();
  return receipt;
};

const burn = async (tokenId) => {
  const result = await contract.burn(tokenId);
  const receipt = await result.wait();
  return receipt;
};

module.exports = {
  mintEmployeeNFT,
  mintEmployeeNFTwithProject,
  AddProject,
  skillUpdate,
  setCurrentProject,
  editProject,
  burnProject,
  burn,
};
