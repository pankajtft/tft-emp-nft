require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const ethereumjs = require("ethereumjs-abi");
const util = require("ethereumjs-util");
const Web3 = require("web3");
const web3 = new Web3();

const { ethers } = require("ethers");
const { solidityKeccak256 } = ethers;
const address = require("../client/pages/contract-constants/addresses.json")
  .EMS[31337];

const abi = require("../client/pages/contract-constants/abi.json_EMS.json");
// const { updateTokenId } = require("./controllers/employee/helpers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/ilstxE0yedAjbQEDV1TaurFfb4Po9Hyw"
);
var signer = new ethers.Wallet(
  "0x7d674e715215ce1d7db8ea53930163c44d2ca181abe7a9d8a4a74a2a8eb43313",
  provider
);
const FactoryContractEthers = new ethers.Contract(address[0], abi, signer);
module.exports = { FactoryContractEthers };


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
  (employeeName, email, skills, empId, empHash) => {
    console.log(
      "nft minted with details ",
      employeeName,
      email,
      skills,
      empId,
      empHash
    );
  }
);

FactoryContractEthers.on(
  "projectAdded",
  (projectName, startTime, endTime, tokenId, team_size, uriHash) => {
    console.log(
      "project added with details ",
      projectName,
      startTime,
      endTime,
      tokenId,
      team_size,
      uriHash
    );
  }
);

FactoryContractEthers.on(
  "projectEdited",
  (projectName, startTime, endTime, tokenId, team_size, projectHash) => {
    console.log(
      "project edited with details ",
      projectName,
      startTime,
      endTime,
      tokenId,
      team_size,
      projectHash
    );
  }
);

FactoryContractEthers.on("skillUpdated", (tokenId, skills, uriHash) => {
  console.log("skill updated with details", tokenId, skills, uriHash);
});

FactoryContractEthers.on("burnNFT", (tokenId) => {
  console.log("Nft burned ", tokenId);
});

FactoryContractEthers.on("buurnProject", (tokenId, projectNumber) => {
  console.log("project details burned ", tokenId, projectNumber);
});

// const employeeName = "lalit";
// const empId = 123457;
// const email = "lalit";


// const encodedData = ethereumjs.rawEncode(
//   ["string", "uint32", "string"],
//   [employeeName, empId, email]
// );
// const empHash = util.keccak256(encodedData);
// console.log(`0x${empHash.toString("hex")}`);


// const input = `${employeeName},${empId},${email}`;
// const empHash1 = util.keccak256(Buffer.from(input));
// console.log(`0x${empHash1.toString("hex")}`);
// const encodedHash = web3.eth.abi.encodeParameter("bytes32", empHash1);
// console.log(encodedHash);

// const encodedData1 = web3.eth.abi.encode(
//   ["string", "uint32", "string"],
//   [employeeName, empId, email]
// );
// const empHash1 = util.keccak256(encodedData1);
// console.log(`0x${empHash1.toString("hex")}`);

// const encodedData2 = solidityKeccak256(
//   ["string", "uint32", "string"],
//   [employeeName, empId, email]
// );
// const empHash2 = util.keccak256(encodedData2);
// console.log(`0x${empHash2.toString("hex")}`);

