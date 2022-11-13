//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error ReactNFT__NeedMoreEth();
error ReactNFT__TransferFailed();

contract ReactNFT is ERC721URIStorage, Ownable {
    //State
    uint256 internal s_tokenID;
    uint256 internal immutable MINT_FEE;

    //Event
    event NFTMinted(uint256 indexed tokenId, address minter);

    constructor(uint256 _mintFee) ERC721("IpfsNft", "IpfsNft") {
        MINT_FEE = _mintFee * 1 ether;
        s_tokenID = 0;
    }

    function createNFT(string memory _tokenURI) public payable {
        if (msg.value < MINT_FEE) {
            revert ReactNFT__NeedMoreEth();
        }
        _safeMint(msg.sender, s_tokenID);
        _setTokenURI(s_tokenID, _tokenURI);
        s_tokenID = s_tokenID + 1;
        emit NFTMinted(s_tokenID, msg.sender);
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert ReactNFT__TransferFailed();
        }
    }

    function getMintFee() public view returns (uint256) {
        return MINT_FEE;
    }

    function getTokenID() public view returns (uint256) {
        return s_tokenID;
    }
}
