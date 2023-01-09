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

const { updateTokenId } = require("./controllers/employee/helpers");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);

var signer = new ethers.Wallet(process.env.POLY_PRIVATE_KEY, provider);
const FactoryContractEthers = new ethers.Contract(address[0], abi, signer);

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
  (_empId, _employeeName, email, _skills, tokenId) => {
    updateTokenId(_empId, tokenId);
    console.log(_empId, _employeeName, email, tokenId);
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
