/** @type import('hardhat/config').HardhatUserConfig */

require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("solidity-coverage");
require("hardhat-deploy");

const TEST_NET_INFURA = process.env.TEST_NET_INFURA;
const PRIVATE_KEY = process.env.ACCOUNT;
const etherscanAPIKey = process.env.ETHERSCAN_TOKEN;
const coinMarketCapKey = process.env.COINMARKETCAP_API_KEY;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      rinkeby: etherscanAPIKey,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: coinMarketCapKey,
  },
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // }
      chainId: 31337,
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ilstxE0yedAjbQEDV1TaurFfb4Po9Hyw",
      accounts: [
        `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`,
      ],
      blockGasLimit: 100000000429720,
    },
    localhost: {
      chainId: 31337,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
