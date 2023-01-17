// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./NFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
        bytes32[] projDetails;
        bool[] exists;
        uint8 currentProject;
    }
    event NFTMinted(
        string employeeName,
        string email,
        string skills,
        uint32 empId,
        uint16 tokenId,
        bytes32 empHash
    );

    event projectAdded(
        string projectName,
        string startTime,
        string endTime,
        uint16 tokenId,
        uint8 team_size,
        bytes32 uriHash
    );
    event projectEdited(
        string projectName,
        string startTime,
        string endTime,
        uint16 tokenId,
        uint8 team_size,
        bytes32 projectHash
    );

    event skillUpdated(uint16 tokenId, string skills, bytes32 skillHash);

    event buurnProject(uint16 tokenId, uint8 projectNumber);

    event burnNFT(uint16 tokenId);

    mapping(uint16 => Employee) employees;

    constructor() {
        NFT = new EmployeeNFT();
    }

    //Mint new Employee
    function mintEmployeeNFT(
        string memory employeeName,
        string memory email,
        string memory skills,
        uint32 empId
    ) public nonReentrant onlyOwner {
        require(
            bytes(employeeName).length > 0,
            "Employee name cannot be empty"
        );
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(skills).length > 0, "Skills cannot be empty");
        require(
            empId >= 100000 && empId <= 999999,
            "Employee ID must be valid"
        );

        bytes32 empHash = keccak256(abi.encode(employeeName, empId, email));
        bytes32 skillHash = keccak256(abi.encode(skills));
        bytes32 uriHash = keccak256(abi.encode(empHash, skillHash));
        string memory uri = string(abi.encode(uriHash));
        uint16 tokenId = NFT.safeMint(uri);
        employees[tokenId].empDetails = empHash;
        employees[tokenId].skillHash = skillHash;
        emit NFTMinted(employeeName, email, skills, empId, tokenId, empHash);
    }

    //Update Skills
    function skillUpdate(uint16 tokenId, string memory skills)
        public
        onlyOwner
    {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        require(bytes(skills).length > 0, "Skills cannot be empty");

        bytes32 uriHash;
        bytes32 skillHash = keccak256(abi.encode(skills));
        employees[tokenId].skillHash = skillHash;
        if (employees[tokenId].projDetails.length == 0) {
            uriHash = keccak256(
                abi.encode(
                    employees[tokenId].empDetails,
                    employees[tokenId].skillHash
                )
            );
        } else {
            uriHash = keccak256(
                abi.encode(
                    employees[tokenId].empDetails,
                    employees[tokenId].projDetails[
                        employees[tokenId].currentProject
                    ],
                    employees[tokenId].skillHash
                )
            );
        }
        string memory uri = string(abi.encode(uriHash));
        NFT.setURI(uint256(tokenId), uri);
        emit skillUpdated(tokenId, skills, skillHash);
    }

    //Add new Project
    function AddProject(
        uint16 tokenId,
        uint8 team_size,
        string memory projectName,
        string memory startTime, //UnixTime
        string memory endTime //UnixTime
    ) external nonReentrant onlyOwner {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        require(team_size >= 1 && team_size <= 10, "Invalid team size");
        require(bytes(projectName).length > 0, "Project name cannot be empty");

        bytes32 projectHash = keccak256(
            abi.encode(projectName, startTime, endTime, team_size)
        );
        employees[tokenId].projDetails.push(projectHash);
        employees[tokenId].exists.push(true);
         setcurrentProject(
            tokenId,
            uint8(employees[tokenId].projDetails.length-1)
        );
        bytes32 uriHash = keccak256(
            abi.encode(
                employees[tokenId].empDetails,
                employees[tokenId].projDetails[
                    uint8(employees[tokenId].projDetails.length - 1)
                ],
                employees[tokenId].skillHash
            )
        );
        string memory uri = string(abi.encode(uriHash));
        NFT.setURI(uint256(tokenId), uri);
        emit projectAdded(
            projectName,
            startTime,
            endTime,
            tokenId,
            team_size,
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
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        return employees[tokenId].currentProject;
    }

    //Set Current Project
    function setcurrentProject(uint16 tokenId, uint8 projectID)
        public
        onlyOwner
    {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        require(employees[tokenId].currentProject == uint8(0), "Current project is already set");
        require(employees[tokenId].exists[projectID], "Project not exists");
        require(employees[tokenId].currentProject != projectID, "Current project is same as project ID");

        employees[tokenId].currentProject = projectID;
        bytes32 uriHash = keccak256(
            abi.encode(
                employees[tokenId].empDetails,
                employees[tokenId].projDetails[projectID],
                employees[tokenId].skillHash
            )
        );
        string memory uri = string(abi.encode(uriHash));
        NFT.setURI(uint256(tokenId), uri);
    }

    //Edit project
    function editProject(
        uint16 tokenId,
        uint8 team_size,
        string memory projectName,
        string memory startTime, //UnixTime
        string memory endTime, //UnixTime
        uint8 projectNumber
    ) public {
        require(team_size >= 1 && team_size <= 10, "Invalid team size");
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        require(bytes(projectName).length > 0, "Project name cannot be empty");
        require(employees[tokenId].exists[projectNumber], "Project not exists");
        require(projectNumber < employees[tokenId].projDetails.length, "Invalid project ID");

        bytes32 projectHash = keccak256(
            abi.encode(projectName, startTime, endTime, team_size)
        );
        employees[tokenId].projDetails[projectNumber] = projectHash;
        emit projectEdited(
            projectName,
            startTime,
            endTime,
            tokenId,
            team_size,
            projectHash
        );
    }

    //Get All Projects Hash
    function getAllProject(uint8 tokenId)
        public
        view
        onlyOwner
        returns (bytes32[] memory)
    {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        return employees[tokenId].projDetails;
    }

    //Return TokenID
    function returnToken() internal view returns (uint16) {
        uint256 tokenId = NFT._tokenIdCounter();
        return (uint16(tokenId) - 1);
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

    function burnProject(uint16 tokenId, uint8 projectID) public onlyOwner {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        require(projectID < employees[tokenId].projDetails.length, "Invalid project ID");
        require(employees[tokenId].exists[projectID], "Project not exists");

        employees[tokenId].projDetails[projectID] = "";
        employees[tokenId].exists[projectID] = false;
        emit buurnProject(tokenId, projectID);
    }

    //burn
    function burn(uint16 tokenId) public virtual onlyOwner {
        require(tokenId >= 0 && tokenId <= returnToken(), "Token ID must be valid");
        NFT.burn(uint256(tokenId));
        emit burnNFT(tokenId);
    }

    //Pure/View Functions
    function getNFT() public view onlyOwner returns (EmployeeNFT) {
        return NFT;
    }
}
