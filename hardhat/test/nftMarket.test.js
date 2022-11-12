const { expect } = require("chai");
const { ethers } = require("hardhat");

let _contract = null;
let _nftPrice = ethers.utils.parseEther("0.3").toString();
let _listingPrice = ethers.utils.parseEther("0.025").toString();


describe('Box', function () {
    before(async () => {
        NftMarket = await ethers.getContractFactory("NftMarket");
        _contract = await NftMarket.deploy();
        await _contract.deployed();
    })

    describe("Mint token", () => {
        const tokenURI = "https://test.com";
        let ownerAddress;

        before(async () => {
            const [owner, addr1, addr2] = await ethers.getSigners();
            ownerAddress = owner.address;
            await _contract.mintToken(tokenURI, _nftPrice, {
                from: ownerAddress,
                value: _listingPrice
            })
        })

        it("owner of the first token should be address[0]", async () => {
            const owner_ = await _contract.ownerOf(1);
            // console.log(owner_)
            expect(owner_).to.be.equal(ownerAddress);
        })
    })
})