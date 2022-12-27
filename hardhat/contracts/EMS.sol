// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./NFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/**
 * @title EmployeeManagementContract
 * @author Shivam Arora
 * @dev Employee Management Contract allows users to create employeesNFTs and manage them
 */
 contract EMS is IERC721Receiver, ReentrancyGuard, Ownable {
    EmployeeNFT internal NFT;

    struct Employee {
        bytes32 empDetails;
        bytes32 projDetails;
    }

    mapping(uint8 => Employee) employees;

    event NFTMinted(
        uint16 _empId,
        string employeeName,
        string email,
        string skills,
        uint16 team_size,
        string _projectName,
        string startTime,
        string endTime,
        uint8 tokenId
    );

    event NFTChanged(
        uint16 tokenId,
        string skills,
        uint16 team_size,
        string _projectName,
        string startTime,
        string endTime
    );

    constructor() {
        NFT = new EmployeeNFT();
    }

    function mintEmployeeNFT(
        string memory _employeeName,
        uint16 _empId,
        string memory email,
        string memory _skills,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime //UnixTime
    ) public nonReentrant {
        bytes32 empHash = keccak256(abi.encode(_employeeName, _empId, email));
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, _skills, team_size)
        );
        bytes32 uriHash = keccak256(abi.encode(empHash, projectHash));
        string memory uri = string(abi.encodePacked(uriHash));
        uint8 tokenId = NFT.safeMint(uri);

        employees[tokenId] = Employee(empHash, projectHash);

        emit NFTMinted(
            _empId,
            _employeeName,
            email,
            _skills,
            team_size,
            _projectName,
            startTime,
            endTime,
            tokenId
        );

    }

    function updateEmployeeNFT(
        uint8 tokenId,
        string memory skills,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime //UnixTime
    ) public {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, skills, team_size)
        );
        employees[tokenId].projDetails = projectHash;
        bytes32 uriHash = keccak256(
            abi.encode(employees[tokenId].empDetails, projectHash)
        );
        string memory uri = string(abi.encodePacked(uriHash));
        NFT.setURI(tokenId, uri);

        emit NFTChanged(
            tokenId,
            skills,
            team_size,
            _projectName,
            startTime,
            endTime
        );
    }

    //Return TokenID
    function returnToken() external view returns(uint8){
        uint256 tokenId = NFT._tokenIdCounter();
        return (uint8(tokenId)-1);
    }

    //Overrides
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    //burn
    function burn(uint8 tokenId) public virtual onlyOwner {
        NFT.burn(uint256(tokenId));
    }

    //Pure/View Functions
    function getNFT() public view onlyOwner returns (EmployeeNFT) {
        return NFT;
    }
}
