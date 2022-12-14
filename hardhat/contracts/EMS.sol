// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./NFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "hardhat/console.sol";

/**
 * @title EmployeeManagementContract
 * @author Shivam Arora
 * @dev Employee Management Contract allows users to create employeesNFTs and manage them
 */
contract EMS is IERC721Receiver, ReentrancyGuard {
    EmployeeNFT internal NFT;

    struct Employee {
        bytes32 empDetails;
        bytes32 projDetails;
    }

    mapping(uint256 => Employee) employees;

    event NFTMinted(
        uint256 _empId,
        string _employeeName,
        string _projectName,
        uint256 startTime,
        uint256 endTime,
        uint256 tokenId
    );

    event NFTChanged(
        uint256 tokenId,
        string _projectName,
        uint256 startTime,
        uint256 endTime
    );

    constructor() {
        NFT = new EmployeeNFT();
    }

    function mintEmployeeNFT(
        string memory _employeeName,
        uint256 _empId,
        string memory _projectName,
        uint256 startTime, //UnixTime
        uint256 endTime //UnixTime
    ) public nonReentrant returns (uint256) {
        bytes32 empHash = keccak256(abi.encode(_employeeName, _empId));
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime)
        );
        bytes32 uriHash = keccak256(abi.encode(empHash, projectHash));
        string memory uri = string(abi.encodePacked(uriHash));
        uint256 tokenId = NFT.safeMint(uri);

        employees[tokenId] = Employee(empHash, projectHash);

        emit NFTMinted(
            _empId,
            _employeeName,
            _projectName,
            startTime,
            endTime,
            tokenId
        );

        return tokenId;
    }

    function updateEmployeeNFT(
        uint256 tokenId,
        string memory _projectName,
        uint256 startTime, //UnixTime
        uint256 endTime //UnixTime
    ) public {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime)
        );
        employees[tokenId].projDetails = projectHash;
        bytes32 uriHash = keccak256(
            abi.encode(employees[tokenId].empDetails, projectHash)
        );
        string memory uri = string(abi.encodePacked(uriHash));
        NFT.setURI(tokenId, uri);

        emit NFTChanged(tokenId, _projectName, startTime, endTime);
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

    //Pure/View Functions
    function getNFT() public view returns (EmployeeNFT) {
        return NFT;
    }
}
