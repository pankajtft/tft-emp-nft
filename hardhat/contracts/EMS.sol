// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./NFT.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "hardhat/console.sol";

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
    // event NFTMintedWithProject(
    //     string employeeName,
    //     string email,
    //     string skills,
    //     string projectName,
    //     string startTime,
    //     string endTime,
        
    //     uint16 tokenId,
    //     uint8 team_size
        
    // );
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
        bytes32 empHash = keccak256(abi.encode(employeeName, empId, email));
        bytes32 skillHash = keccak256(abi.encode(skills));
        bytes32 uriHash = keccak256(abi.encode(empHash, skillHash));
        string memory uri = string(abi.encode(uriHash));
        uint16 tokenId = NFT.safeMint(uri);
        employees[tokenId].empDetails = empHash;
        employees[tokenId].skillHash = skillHash;
        emit NFTMinted(employeeName, email, skills, empId, tokenId, empHash);
    }

    //Mint new Employee with Project
    // function mintEmployeeNFTwithProject(
    //     string memory employeeName,
    //     uint32 empId,
    //     string memory email,
    //     string memory skills,
    //     string memory projectName,
    //     uint8 team_size,
    //     string memory startTime, //UnixTime
    //     string memory endTime //UnixTime
    // ) public nonReentrant onlyOwner {
    //     bytes32 empHash = keccak256(abi.encode(employeeName, empId, email));
    //     bytes32 skillHash = keccak256(abi.encode(skills));
    //     bytes32 projectHash = keccak256(
    //         abi.encode(projectName, startTime, endTime, team_size)
    //     );
    //     bytes32 uriHash = keccak256(
    //         abi.encode(empHash, skillHash, projectHash)
    //     );
    //     string memory uri = string(abi.encode(uriHash));
    //     uint16 tokenId = NFT.safeMint(uri);
    //     employees[tokenId].empDetails = empHash;
    //     employees[tokenId].skillHash = skillHash;
    //     employees[tokenId].projDetails.push(projectHash);
    //     setcurrentProject(
    //         tokenId,
    //         uint8(employees[tokenId].projDetails.length - 1)
    //     );
    //     employees[tokenId].exists.push(true);
    //     emit NFTMintedWithProject(
    //         employeeName,
    //         email,
    //         skills,
    //         projectName,
    //         startTime,
    //         endTime,
    //         tokenId,
    //         team_size
    //     );
    // }

    //Update Skills
    function skillUpdate(uint16 tokenId, string memory skills)
        public
        onlyOwner
    {
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
        bytes32 projectHash = keccak256(
            abi.encode(projectName, startTime, endTime, team_size)
        );
        employees[tokenId].projDetails.push(projectHash);
        setcurrentProject(
            tokenId,
            uint8(employees[tokenId].projDetails.length - 1)
        );
        employees[tokenId].exists.push(true);
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
        return employees[tokenId].currentProject;
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
        employees[tokenId].currentProject = projectID;
        bytes32 uriHash = keccak256(
            abi.encode(
                employees[tokenId].empDetails,
                employees[tokenId].projDetails[
                    employees[tokenId].currentProject
                ],
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
        require(employees[tokenId].exists[projectNumber], "Project does not exist");
        bytes32 projectHash = keccak256(
            abi.encode(projectName, startTime, endTime, team_size)
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
        // emit NFTChanged(tokenId, team_size, projectName, startTime, endTime);
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

    function burnProject(uint16 tokenId, uint8 projectNumber) public onlyOwner {
        employees[tokenId].projDetails[projectNumber] = "";
        employees[tokenId].exists[projectNumber] = false;
        emit buurnProject(tokenId,projectNumber);
    }

    //burn
    function burn(uint16 tokenId) public virtual onlyOwner {
        NFT.burn(uint256(tokenId));
        emit burnNFT(tokenId);
    }

    //Pure/View Functions
    function getNFT() public view onlyOwner returns (EmployeeNFT) {
        return NFT;
    }
}
