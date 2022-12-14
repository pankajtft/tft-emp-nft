// const chai = require("chai");
// const { expect, assert } = require("chai");
// const eventemitter2 = require("chai-eventemitter2");
// chai.use(eventemitter2());
// const { ethers } = require("hardhat");

// describe("NFT MARKETPLACE ", () => {
//   let player1, player2, deployer, ems, emsContract;

//   beforeEach(async () => {
//     accounts = await ethers.getSigners(); // could also do with getNamedAccounts
//     deployer = accounts[0];
//     player1 = accounts[1];
//     player2 = accounts[2];
//     await deployments.fixture(["ems"]); // Deploys modules with the tags given
//     emsContract = await ethers.getContract("EMS");
//     ems = emsContract.connect(player1);
//   });

//   describe("Deploying", function () {
//     it("should deploy nft contract when deployed", async () => {
//       expect(await ems.getNFT()).to.be.a.properAddress;
//     });
//   });

//   describe("Minting", function () {
//     it("should mint nft contract", async () => {
//       expect(
//         await ems.mintEmployeeNFT("ShivamArora", 17, "Project1", 100000, 20000)
//       ).to.emit(ems, "NFTMinted");
//     });

//     it("should update nft contract", async () => {
//       await ems.mintEmployeeNFT("ShivamArora", 17, "Project1", 100000, 20000);
//       expect(await ems.updateEmployeeNFT(0, "Project2", 100000, 20000)).to.emit(
//         ems,
//         "NFTChanged"
//       );
//     });
//   });
// });
