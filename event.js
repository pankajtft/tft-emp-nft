const { ethers } = require("ethers");

const data = require("./hardhat/deployments/localhost/EMS.json");
const url = "http://127.0.0.1:8545/";
const factoryContractAddress = "0x663F3ad617193148711d28f5334eE4Ed07016602";

// var web3 = new Web3(url);
// const FactoryContract = new web3.eth.Contract(data.abi, data.address);
const provider = new ethers.providers.JsonRpcProvider(url);
const FactoryContractEthers = new ethers.Contract(
  factoryContractAddress,
  data.abi,
  provider
);

FactoryContractEthers.on(
  "NFTMinted",
  (_empId, _employeeName, _projectName, startTime, endTime, tokenId) => {
    console.log(
      Number(_empId._hex),
      _employeeName,
      _projectName,
      new Date(Number(startTime._hex)),
      new Date(Number(endTime._hex)),
      Number(tokenId._hex)
    );
    // createEmployee(
    //   Number(_empId._hex),
    //   _employeeName,
    //   _projectName,
    //   new Date(Number(startTime._hex)),
    //   new Date(Number(endTime._hex)),
    //   Number(tokenId._hex)
    // );
  }
);

FactoryContractEthers.on(
  "NFTChanged",
  (tokenId, _projectName, startTime, endTime) => {
    console.log(
         Number(tokenId._hex),
     _projectName,
      new Date(Number(startTime._hex)),
      new Date(Number(endTime._hex))
    )
    // addNewProject(
    //   Number(tokenId._hex),
    //   _projectName,
    //   new Date(Number(startTime._hex)),
    //   new Date(Number(endTime._hex))
    // );
  }
);
