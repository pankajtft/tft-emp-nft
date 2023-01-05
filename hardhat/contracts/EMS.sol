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
        bytes32 skillHash;
        uint8 _currentProject;
        bytes32[] projDetails;
    }

    mapping(uint8 => Employee) employees;
    

    event NFTMinted(
        uint32 _empId,
        string employeeName,
        string email,
        uint8 tokenId,
        bytes32 _empHash
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

    //Mint new Employee
    function mintEmployeeNFT(
        string memory _employeeName,
        uint32 _empId,
        string memory email
    ) public nonReentrant onlyOwner returns(uint8){

        Employee memory emp;
        bytes32 empHash = keccak256(abi.encode(_employeeName, _empId, email));
        string memory uri = string(abi.encodePacked(empHash));
        uint8 tokenId = NFT.safeMint(uri);
        emp.empDetails = empHash;
        employees[tokenId] = emp;

        emit NFTMinted(
            _empId,
            _employeeName,
            email,
            tokenId,
            empHash
        );
        return tokenId;

    }

    //Update Skills
    function skillUpdate(uint8 tokenId, string memory _skills) public onlyOwner{
        bytes32 _skillHash = keccak256(abi.encode(_skills));
        employees[tokenId].skillHash = _skillHash;
    } 


    //Add new Project
    function AddProject(
        uint8 tokenId,
        string memory _skills,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime, //UnixTime
        uint8 projectNumber
    ) external nonReentrant onlyOwner{
        
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, _skills, team_size)
        );
        skillUpdate(tokenId,_skills);

        employees[tokenId].projDetails.push(projectHash);
        if (projectNumber == 1){
            setcurrentProject(tokenId, projectNumber);
        }

        bytes32 uriHash = keccak256(abi.encode(employees[tokenId].empDetails, employees[tokenId].projDetails[projectNumber-1], employees[tokenId].skillHash)
        );
        string memory uri = string(abi.encodePacked(uriHash));
        NFT.setURI(uint256(tokenId), uri);

        emit NFTChanged(
            tokenId,
            _skills,
            team_size,
            _projectName,
            startTime,
            endTime
        );
    }

    //Get Current Project
    function getcurrentProject(uint8 tokenId) external view onlyOwner returns(uint8){
        return employees[tokenId]._currentProject;
    }

    //Set Current Project
    function setcurrentProject(uint8 tokenId,uint8 projectID) public onlyOwner{
        employees[tokenId]._currentProject = projectID;
    }

   //Edit project
    function editProject(
        uint8 tokenId,
        string memory skills,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime, //UnixTime
        uint8 projectNumber
    ) public {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, skills, team_size)
        );
        employees[tokenId].projDetails[projectNumber-1] = projectHash;
        bytes32 uriHash = keccak256(
            abi.encode(employees[tokenId].empDetails, employees[tokenId].projDetails[projectNumber-1], employees[tokenId].skillHash)
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

    //Get All Projects Hash
    function getAllProject(uint8 tokenId) public view onlyOwner returns(bytes32[] memory){
        return employees[tokenId].projDetails;
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

    function burnProject(uint8 tokenId, uint8 projectNumber) public onlyOwner {
        employees[tokenId].projDetails[projectNumber-1] = "";
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
