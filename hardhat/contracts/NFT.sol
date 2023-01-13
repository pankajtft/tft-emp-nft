// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EmployeeNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public _tokenIdCounter;

    constructor() ERC721("EMS", "TFT") {}

    function safeMint(string memory uri) public onlyOwner returns (uint8) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        return uint8(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /* firstTokenId */,
        uint256 /* batchSize */
    ) internal virtual override {
        require(
            from == address(0) || to == address(0),
            "You can't transfer this NFT"
        );
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    //Setting the URI of the token (onlyOwner)
    function setURI(uint256 tokenId, string memory _uri) external onlyOwner {
        _setTokenURI(tokenId, _uri);
    }
}
