require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { ethers } = require("ethers");
const data = require("../hardhat/deployments/localhost/EMS.json");
const { createEmployee, addNewProject } = require("./controllers/employee");

const url = "http://127.0.0.1:8545/";
const factoryContractAddress = data.address;

const provider = new ethers.providers.JsonRpcProvider(url);
const FactoryContractEthers = new ethers.Contract(
  factoryContractAddress,
  data.abi,
  provider
);

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
  (_empId, _employeeName, _projectName, startTime, endTime, tokenId) => {
    createEmployee(
      Number(_empId._hex),
      _employeeName,
      _projectName,
      new Date(Number(startTime._hex)),
      new Date(Number(endTime._hex)),
      Number(tokenId._hex)
    );
  }
);

FactoryContractEthers.on(
  "NFTChanged",
  (tokenId, _projectName, startTime, endTime) => {
    addNewProject(
      Number(tokenId._hex),
      _projectName,
      new Date(Number(startTime._hex)),
      new Date(Number(endTime._hex))
    );
  }
);
