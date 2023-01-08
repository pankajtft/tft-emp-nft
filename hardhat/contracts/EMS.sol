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
    mapping(uint16 => Employee) employees;
    event NFTMinted(
        uint32 _empId,
        string employeeName,
        string email,
        string _skills,
        uint16 tokenId,
        bytes32 _empHash
    );
    event NFTMintedWithProject(
        uint32 _empId,
        string employeeName,
        string email,
        string _skills,
        string _projectName,
        uint8 team_size,
        string startTime,
        string endTime,
        uint16 tokenId,
        bytes32 uriHash
    );
    event projectAdded(
        uint16 tokenId,
        uint16 team_size,
        string _projectName,
        string startTime,
        string endTime,
        bytes32 uriHash
    );

    event skillUpdated(uint16 tokenId, string skills, bytes32 uriHash);

    event burnNFT(uint16 tokenId);

    constructor() {
        NFT = new EmployeeNFT();
    }

    //Mint new Employee
    function mintEmployeeNFT(
        string memory _employeeName,
        uint32 _empId,
        string memory email,
        string memory _skills
    ) public nonReentrant onlyOwner {
        bytes32 empHash = keccak256(abi.encode(_employeeName, _empId, email));
        bytes32 _skillHash = keccak256(abi.encode(_skills));
        bytes32 uriHash = keccak256(abi.encode(empHash, _skillHash));
        string memory uri = string(abi.encode(uriHash));
        uint16 tokenId = NFT.safeMint(uri);
        employees[tokenId].empDetails = empHash;
        employees[tokenId].skillHash = _skillHash;
        emit NFTMinted(_empId, _employeeName, email, _skills, tokenId, empHash);
    }

    //Mint new Employee with Project
    function mintEmployeeNFTwithProject(
        string memory _employeeName,
        uint32 _empId,
        string memory email,
        string memory _skills,
        string memory _projectName,
        uint8 team_size,
        string memory startTime, //UnixTime
        string memory endTime //UnixTime
    ) public nonReentrant onlyOwner {
        bytes32 empHash = keccak256(abi.encode(_employeeName, _empId, email));
        bytes32 _skillHash = keccak256(abi.encode(_skills));
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, team_size)
        );
        bytes32 uriHash = keccak256(
            abi.encode(empHash, _skillHash, projectHash)
        );
        string memory uri = string(abi.encode(uriHash));
        uint16 tokenId = NFT.safeMint(uri);
        employees[tokenId].empDetails = empHash;
        employees[tokenId].skillHash = _skillHash;
        employees[tokenId].projDetails.push(projectHash);
        setcurrentProject(tokenId, uint8(employees[tokenId].projDetails.length - 1));
        emit NFTMintedWithProject(
            _empId,
            _employeeName,
            email,
            _skills,
            _projectName,
            team_size,
            startTime,
            endTime,
            tokenId,
            uriHash
        );
    }

    //Update Skills
    function skillUpdate(uint8 tokenId, string memory _skills)
        public
        onlyOwner
    {
        bytes32 _skillHash = keccak256(abi.encode(_skills));
        employees[tokenId].skillHash = _skillHash;
        bytes32 uriHash = keccak256(
            abi.encode(
                employees[tokenId].empDetails,
                employees[tokenId].projDetails[
                    employees[tokenId]._currentProject
                ],
                employees[tokenId].skillHash
            )
        );
        string memory uri = string(abi.encode(uriHash));
        NFT.setURI(uint256(tokenId), uri);
        emit skillUpdated(tokenId, _skills, _skillHash);
    }

    //Add new Project
    function AddProject(
        uint8 tokenId,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime, //UnixTime
        uint8 projectNumber
    ) external nonReentrant onlyOwner {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, team_size)
        );
        employees[tokenId].projDetails.push(projectHash);
        setcurrentProject(tokenId, uint8(employees[tokenId].projDetails.length - 1));
        bytes32 uriHash = keccak256(
            abi.encode(
                employees[tokenId].empDetails,
                employees[tokenId].projDetails[projectNumber],
                employees[tokenId].skillHash
            )
        );
        string memory uri = string(abi.encode(uriHash));
        NFT.setURI(uint256(tokenId), uri);
        emit projectAdded(
            tokenId,
            team_size,
            _projectName,
            startTime,
            endTime,
            uriHash
        );
    }

    //Get Current Project
    function getcurrentProject(uint16 tokenId)
        external
        view
        onlyOwner
        returns (uint8)
    {
        return employees[tokenId]._currentProject;
    }

    //Set Current Project
    function setcurrentProject(uint16 tokenId, uint8 projectID)
        public
        onlyOwner
    {
        require(
            (employees[tokenId].projDetails.length - 1) >= projectID,
            "projectID not exist"
        );
        employees[tokenId]._currentProject = projectID;
    }

    //Edit project
    function editProject(
        uint8 tokenId,
        uint16 team_size,
        string memory _projectName,
        string memory startTime, //UnixTime
        string memory endTime, //UnixTime
        uint8 projectNumber
    ) public {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, team_size)
        );
        employees[tokenId].projDetails[projectNumber] = projectHash;
        // bytes32 uriHash = keccak256(
        //     abi.encode(
        //         employees[tokenId].empDetails,
        //         employees[tokenId].projDetails[projectNumber],
        //         employees[tokenId].skillHash
        //     )
        // );
        // string memory uri = string(abi.encode(uriHash));
        // NFT.setURI(tokenId, uri);
        // emit NFTChanged(tokenId, team_size, _projectName, startTime, endTime);
    }

    //Get All Projects Hash
    function getAllProject(uint8 tokenId)
        public
        view
        onlyOwner
        returns (bytes32[] memory)
    {
        return employees[tokenId].projDetails;
    }

    //Return TokenID
    function returnToken() external view returns (uint8) {
        uint256 tokenId = NFT._tokenIdCounter();
        return (uint8(tokenId) - 1);
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
        employees[tokenId].projDetails[projectNumber] = "";
    }

    //burn
    function burn(uint8 tokenId) public virtual onlyOwner {
        NFT.burn(uint256(tokenId));
        emit burnNFT(tokenId);
    }

    //Pure/View Functions
    function getNFT() public view onlyOwner returns (EmployeeNFT) {
        return NFT;
    }
}
