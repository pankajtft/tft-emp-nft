const chai = require("chai");
const { expect, assert } = require("chai");
const eventemitter2 = require("chai-eventemitter2");
chai.use(eventemitter2());
const { ethers } = require("hardhat");
const ch = require("@nomicfoundation/hardhat-chai-matchers");

describe("NFT MARKETPLACE ", () => {
  let player1, player2, deployer, ems, emsContract;

  beforeEach(async () => {
    accounts = await ethers.getSigners(); // could also do with getNamedAccounts
    deployer = accounts[0];
    player1 = accounts[1];
    player2 = accounts[2];
    await deployments.fixture(["ems"]); // Deploys modules with the tags given
    emsContract = await ethers.getContract("EMS");
    ems = emsContract.connect(deployer);
    ems2 = emsContract.connect(player1);
    ems3 = emsContract.connect(player2);
  });

  describe("Deploying", function () {
    it("should deploy nft contract when deployed", async () => {
      expect(await ems.getNFT()).to.be.a.properAddress;
    });
  });

  describe("Minting", function () {
    it("should mint nft contract", async () => {
      expect(
        await ems.mintEmployeeNFT("AnuragPathak", 17, "anu@test.com", "react,solidity", 7, "Project1", "100000", "20000")
      ).to.emit(ems, "NFTMinted");
    });

    it("should update nft contract", async () => {
      await ems.mintEmployeeNFT("AnuragPathak", 17, "anu@test.com", "react,solidity", 7, "Project1", "100000", "20000");
      expect(await ems.updateEmployeeNFT(0, "hardhat,solidity", 4, "Project2", "1100000", "220000")).to.emit(
        ems,
        "NFTChanged"
      );
    });

    it("should fetch token ID", async () => {
      await ems.mintEmployeeNFT("AnuragPathak", 17, "anu@test.com", "react,solidity", 7, "Project1", "100000", "20000");
      await ems.mintEmployeeNFT("LalitKishor", 10, "lalit@test.com", "react,solidity", 4, "Project2", "11000", "90000");
      expect(await ems.returnToken()).to.equal(1);
    });

    it("Should fetch the Token Contract Address", async () => {
      expect(await ems.getNFT()).to.be.a.properAddress;
    })
  });
  describe("Error Checks", function (){
      it("Random address trying to burn the token", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", 17, "anu@test.com", "react,solidity", 7, "Project1", "100000", "20000");
        let tokenId = await ems.returnToken();
        expect(await ems2.burn(tokenId)).to.be.reverted;
      });
  });
});
