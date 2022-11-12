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
            expect(owner_).to.be.equal(ownerAddress);
        })

        it("first token should point to the correct tokenURI", async () => {
            const actualTokenURI = await _contract.tokenURI(1);
            expect(actualTokenURI).to.be.equal(tokenURI);
        })

        it("should not be possible to create a NFT with used tokenURI", async () => {
            try {
                const obj = await _contract.mintToken(tokenURI, _nftPrice, {
                    from: ownerAddress
                })
            } catch (error) {
                expect(error).not.to.be.empty;
            }
        })

        it("should have one listed item", async () => {
            const listedItemCount = await _contract.listedItemsCount();
            expect(listedItemCount.toNumber()).to.be.equal(1);
        })

        it("should have create NFT item", async () => {
            const nftItem = await _contract.getNftItem(1);
            expect(nftItem.tokenId.toNumber()).to.be.equal(1, "Token id is not 1");
            expect(nftItem.price.toString()).to.be.equal(_nftPrice, "Nft price is not correct");
            expect(nftItem.creator).to.be.equal(ownerAddress, "Creator is not account[0]");
            expect(nftItem.isListed).to.be.true;
        })
    })
})