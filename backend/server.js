require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const { mintEmployee } = require("./index");
const app = express();

const { ethers } = require("ethers");
const address = require("../client/pages/contract-constants/addresses.json")
  .EMS[31337];
const abi = require("../client/pages/contract-constants/abi.json_EMS.json");
// const {
// createEmployee,
//  addNewProject,
// } = require("./controllers/employee");
const { updateTokenId } = require("./controllers/employee/helpers");

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
// const txSigner = FactoryContractEthers.connect(signer);
const FactoryContractEthers = new ethers.Contract(address[0], abi, signer);

// const options = {
//   gasLimit: 1000000, // Adjust as needed
//   value: ethers.utils.parseEther("0.01"), // Value to send with the transaction (in wei)
// };

// console.log(mintEmployee("shivam","21","shivam@gmail.com"));

// const m = async () => {
//   const result = await FactoryContractEthers.mintEmployeeNFT(
//     "lalit",
//     12,
//     "awe@"
//   ); const receipt = await result.wait();

//   const pro = await FactoryContractEthers.AddProject(
//     0,
//     "html,css",
//     9,
//     "deify",
//     "100000",
//     "20000",
//     1
//   );
//   const pro1 = await pro.wait();

//   console.log("receipt", receipt);
//   console.log("pro", pro1);

//   // let mint = await txSigner.mintEmployeeNFT("lalit", 12, "tiwari@gmail.com");
//   // let s = await FactoryContractEthers.methods.getcurrentProject().call();
//   // console.log(mint);
// };
// m();
// console.log(FactoryContractEthers);

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// Init all other stuff
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(require("./routes"));

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"));

initMongo();

FactoryContractEthers.on(
  "NFTMinted",
  (
    _empId,
    _employeeName,
    email,
    _skills,
    tokenId
    // skills,
    // team_size,
    // _projectName,
    // startTime,
    // endTime,
  ) => {
    updateTokenId(_empId, tokenId);
    console.log(
      _empId,
      _employeeName,
      email,
      tokenId
      // skills,
      // Number(team_size._hex),
      // _projectName,
      // new Date(Number(startTime._hex)),
      // new Date(Number(endTime._hex)),
      // Number(tokenId._hex)
    );
  }
);

FactoryContractEthers.on(
  "projectAdded",
  (tokenId, skills, team_size, _projectName, startTime, endTime) => {
    console.log(tokenId, skills, team_size, _projectName, startTime, endTime);
  }
);

FactoryContractEthers.on(
  "NFTMintedWithProject",
  (
    _empId,
    _employeeName,
    email,
    _skills,
    _projectName,
    team_size,
    startTime,
    endTime,
    tokenId,
    uriHash
  ) => {
    updateTokenId(_empId, tokenId);
  }
);

FactoryContractEthers.on("skillUpdated", (tokenId, skills, uriHash) => {
  console.log("data", tokenId, skills, uriHash);
});

FactoryContractEthers.on("burnNFT", (tokenId) => {
  console.log("burned", tokenId);
});
