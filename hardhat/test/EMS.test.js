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
          await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721)
        ).to.emit('NFTMinted', { count: 6 });
      });
    });

    describe("Updating Skills", function () {
      it("should Update Skill without project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        expect(
          await ems.skillUpdate(0, "react,solidity,node,hardhat")
        ).to.emit('skillUpdated', { count: 3 });
      });

     
    });

    describe("Adding new projects", function () {
      it("Should add new project for new Employee without project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        expect(
          await ems.AddProject(0, 5, "Blockchain", "25022022", "31032023")
        ).to.emit('projectAdded', { count: 6 });
      });

      
    });

    describe("Updating Projects", function () {
      it("Should Edit project of an Employee", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.AddProject(0, 5, "Blockchain Developer", "15022022", "02032023");
        expect(
          await ems.editProject(0, 8, "Backend Developer", "25022022", "31032023", 1)
        ).to.emit('projectEdited', { count: 6 });
      });

      it("Should not edit a non existing project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.AddProject(0, 5, "Blockchain Developer", "15022022", "02032023");
        await ems.burnProject(0, 1);
        await expect(
          ems.editProject(0, 8, "Backend Developer", "25022022", "31032023", 1)
        ).to.be.reverted;
      });
    });

    describe("Deleting Project", function () {
      it("Should Burn project of an Employee", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.AddProject(0, 5, "Blockchain Developer", "15022022", "02032023");
        expect(
          await ems.burnProject(0, 1)
        ).to.emit('burnProject', { count: 2 });
      });

      it("Should not burn a non existing project", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.AddProject(0, 5, "Blockchain Developer", "15022022", "02032023");
        await expect(
          ems.burnProject(0, 2)
        ).to.be.reverted;
      });
    });

    describe("Deleting NFT", function () {
      it("Should burn Employee NFT", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await ems.AddProject(0, 5, "Blockchain Developer", "15022022", "02032023");
        expect(
          await ems.burn(0)
        ).to.emit('burnNFT', { count: 1 });
      });

      it("Should not burn a non existing NFT", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await ems.AddProject(0, 7, "Backend", "25022022", "31032023");
        await expect(
          ems.burn(1)
        ).to.be.reverted;
      });
    });
  });

  describe("---NEGATIVE CASES---", () => {

    describe("Deploying", function () {
      it("Should deploy NFT contract, but won't let fetch address of NFT contract when requested from another address", async () => {
        expect(await ems.getNFT()).to.be.a.properAddress;
        await expect(
          ems2.getNFT()
        ).to.be.reverted;
      });
    });

    describe("Minting", function () {
      it("Should not mint employee from other address", async () => {
        await expect(
          ems2.mintEmployeeNFT("AnuragPathak", "anu@test.com", "react,solidity", 655782)
        ).to.be.reverted;
      });

      it("Employee name should not be empty", async () => {
        await expect(
          ems.mintEmployeeNFT("", "anu@test.com", "react,solidity", 655782)
        ).to.be.reverted;
      });

      it("Email cannot be empty", async () => {
        await expect(
          ems.mintEmployeeNFT("AnuragPathak", "", "react,solidity", 655782)
        ).to.be.reverted;
      });

      it("Skills cannot be empty", async () => {
        await expect(
          ems.mintEmployeeNFT("AnuragPathak", "anu@test.com", "", 655782)
        ).to.be.reverted;
      });

      it("Employee ID must be valid", async () => {
        await expect(
          ems.mintEmployeeNFT("AnuragPathak", "anu@test.com", "react,solidity", 6557821)
        ).to.be.reverted;
      });
    });

    describe("Skill Update", function () {
      it("Should not update from another address", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await expect(
          ems2.skillUpdate(0,"react,solidity,nodejs")
        ).to.be.reverted;
      });

      it("Should throw error when given wrong token ID", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await expect(
          ems.skillUpdate(1,"react,solidity,nodejs")
        ).to.be.reverted;
      });
    });

    describe("Add Project", function () {
      it("Should not add project from another address", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await expect(
          ems2.AddProject(0,5,"Blockchain","2500284","03022023")
        ).to.be.reverted;
      });

      it("Should not add project to wrong token", async () => {
        await ems.mintEmployeeNFT("AnuragPathak", "anurag@tftus.com", "react,solidity", 566721);
        await expect(
          ems.AddProject(1,5,"Blockchain","2500284","03022023")
        ).to.be.reverted;
      });
    });
  });
});
