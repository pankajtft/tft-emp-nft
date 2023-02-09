// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
contract EmployeeNFT is ERC721, ERC721URIStorage{
    address private _owner;
    // using Counters for Counters.Counter;
    // Counters.Counter public _tokenIdCounter;
    modifier onlyOwner() {
        require(msg.sender == _owner, "caller is not the owner !");
        _;
    }
    constructor() ERC721("EMS", "TFT") {
        _owner = msg.sender;
    }

    // function updateOwner(address )
    function safeMint(string memory uri, uint32 empID)
        external
        onlyOwner
    {
        // uint16 tokenId = uint16(_tokenIdCounter.current());
        // _tokenIdCounter.increment();
        _safeMint(msg.sender, empID);
        _setTokenURI(empID, uri);
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256, /* firstTokenId */
        uint256 /* batchSize */
    ) internal virtual override {
        require(
            from == address(0) || to == address(0),
            "You can't transfer this NFT"
        );
    }
    function burn(uint32 empID) external onlyOwner {
        _burn(uint256(empID));
    }
    // The following functions are overrides required by Solidity.
    function _burn(uint256 empId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(empId);
    }
    function tokenURI(uint256 empId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(empId);
    }
    //Setting the URI of the token (onlyOwner)
    function setURI(uint32 empId, string memory uri) external onlyOwner {
        _setTokenURI(uint256(empId), uri);
    }
}


















