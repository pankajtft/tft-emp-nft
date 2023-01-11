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
  describe("---POSITIVE CASES---", () => {

    describe("Deploying", function () {
      it("should deploy nft contract when deployed", async () => {
        expect(await ems.getNFT()).to.be.a.properAddress;
      });
    });

    describe("Minting", function () {
      it("should mint Employee NFT without project", async () => {
        expect(
          await ems.mintEmployeeNFT("AnuragPathak", 566721, "anu@test.com", "react,solidity")
        ).to.emit('NFTMinted', { count: 6 });
      });

      it("should mint Employee NFT with project", async () => {
        expect(
          await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023")
        ).to.emit('NFTMinted', { count: 10 });
      });
    });

    describe("Updating Skills", function () {
      it("should Update Skill without project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", 566721, "anu@test.com", "react,solidity");
        expect(
          await ems.skillUpdate(0, "react,solidity,node,hardhat")
        ).to.emit('skillUpdated', { count: 3 });
      });

      it("should Update skill with project", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        expect(
          await ems.skillUpdate(0, "react,solidity,node,hardhat")
        ).to.emit('skillUpdated', { count: 3 });
      });
    });

    describe("Adding new projects", function () {
      it("Should add new project for new Employee without project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", 566721, "anu@test.com", "react,solidity");
        expect(
          await ems.AddProject(0, 5, "Blockchain", "25022022", "31032023")
        ).to.emit('projectAdded', { count: 6 });
      });

      it("Should add project for an Employee having multiple project", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        expect(
          await ems.AddProject(0, 2, "Blockchain Software Developer", "26022022", "02032023")
        ).to.emit('projectAdded', { count: 6 });
      });
    });

    describe("Updating Projects", function () {
      it("Should Edit project of an Employee", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        expect(
          await ems.editProject(0, 8, "Backend Developer", "25022022", "31032023", 1)
        ).to.emit('projectEdited', { count: 6 });
      });

      it("Should not edit a non existing project", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.burnProject(0, 1);
        await expect(
          ems.editProject(0, 8, "Backend Developer", "25022022", "31032023", 1)
        ).to.be.reverted;
      });
    });

    describe("Deleting Project", function () {
      it("Should Burn project of an Employee", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        expect(
          await ems.burnProject(0, 1)
        ).to.emit('burnProject', { count: 2 });
      });

      it("Should not burn a non existing project", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await expect(
          ems.burnProject(0, 2)
        ).to.be.reverted;
      });
    });

    describe("Deleting NFT", function () {
      it("Should burn Employee NFT", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        expect(
          await ems.burn(0)
        ).to.emit('burnNFT', { count: 1 });
      });

      it("Should not burn a non existing NFT", async () => {
        await ems.mintEmployeeNFTwithProject("AnuragPathak", 566721, "anu@test.com", "react,solidity", "Blockchain", 5, "25022022", "31032023");
        await expect(
          ems.burn(1)
        ).to.be.reverted;
      });
    });
  });
});
