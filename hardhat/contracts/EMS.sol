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
        bool[] exists;
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
    event projectEdited(
        uint16 tokenId,
        uint16 team_size,
        string _projectName,
        string startTime,
        string endTime,
        bytes32 uriHash
    );

    event skillUpdated(uint16 tokenId, string skills, bytes32 uriHash);

    event buurnProject(uint8 tokenId, uint8 projectNumber);

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
        setcurrentProject(
            tokenId,
            uint8(employees[tokenId].projDetails.length - 1)
        );
        employees[tokenId].exists.push(true);
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
    function skillUpdate(uint16 tokenId, string memory _skills)
        public
        onlyOwner
    {
        bytes32 uriHash;
        bytes32 _skillHash = keccak256(abi.encode(_skills));
        employees[tokenId].skillHash = _skillHash;
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
                        employees[tokenId]._currentProject
                    ],
                    employees[tokenId].skillHash
                )
            );
        }
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
        string memory endTime //UnixTime
    ) external nonReentrant onlyOwner {
        bytes32 projectHash = keccak256(
            abi.encode(_projectName, startTime, endTime, team_size)
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
        require(employees[tokenId].exists[projectNumber], "Project does not exist");
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
        emit projectEdited(
            tokenId,
            team_size,
            _projectName,
            startTime,
            endTime,
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

    function burnProject(uint8 tokenId, uint8 projectNumber) public onlyOwner {
        employees[tokenId].projDetails[projectNumber] = "";
        employees[tokenId].exists[projectNumber] = false;
        emit buurnProject(tokenId,projectNumber);
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

// pragma solidity ^0.8.9;
// import "./NFT.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/math/SafeMath.sol";

// /**
//  * @title EmployeeManagementContract
//  * @author Shivam Arora
//  * @dev Employee Management Contract allows users to create employeesNFTs and manage them
//  */
// contract EMS is IERC721Receiver, ReentrancyGuard, Ownable {
//     using SafeMath for uint16;
//     EmployeeNFT internal NFT;
//     struct Employee {
//         bytes32 empDetails;
//         bytes32 skillHash;
//         uint8 _currentProject;
//         bytes32[] projDetails;
//         bool[] exists;
//     }
//     mapping(uint16 => Employee) employees;
//     mapping(uint32 => bool) empIds;
//     mapping(uint16 => uint8) numOfProjects;
//     event NFTMinted(
//         uint32 _empId,
//         bytes32 employeeName,
//         bytes32 email,
//         bytes32 _skills,
//         uint16 tokenId,
//         bytes32 _empHash
//     );
//     event NFTMintedWithProject(
//         uint32 _empId,
//         bytes32 employeeName,
//         bytes32 email,
//         bytes32 _skills,
//         bytes32 _projectName,
//         uint8 team_size,
//         bytes32 startTime,
//         bytes32 endTime,
//         uint16 tokenId,
//         bytes32 uriHash
//     );
//     event projectAdded(
//         uint16 tokenId,
//         uint16 team_size,
//         bytes32 _projectName,
//         bytes32 startTime,
//         bytes32 endTime,
//         bytes32 uriHash
//     );
//     event projectEdited(
//         uint16 tokenId,
//         uint16 team_size,
//         bytes32 _projectName,
//         bytes32 startTime,
//         bytes32 endTime,
//         bytes32 uriHash
//     );

//     event skillUpdated(uint16 tokenId, bytes32 skills, bytes32 uriHash);

//     event buurnProject(uint8 tokenId, uint8 projectNumber);

//     event burnNFT(uint16 tokenId);

//     constructor() {
//         NFT = new EmployeeNFT();
//     }

//     //Mint new Employee
//     function mintEmployeeNFT(
//         bytes32 employeeName,
//         uint32 _empId,
//         bytes32 email,
//         bytes32 _skills
//     ) public nonReentrant onlyOwner {
//         require(employeeName.length != 0, "Employee name cannot be empty");
//         require(email.length != 0, "Email cannot be empty");
//         require(_skills.length != 0, "Skills cannot be empty");
//         require(!empIds[_empId], "Employee ID already exists");
//         bytes32 empHash = keccak256(abi.encode(employeeName, _empId, email));
//         bytes32 _skillHash = keccakak256(_skills);
//         bytes32 uriHash = keccak256(abi.encode(empHash, _skillHash));
//         string memory uri = string(abi.encode(uriHash));
//         uint16 tokenId = NFT.safeMint(uri);
//         empIds[_empId] = true;
//         numOfProjects[tokenId] = 0;
//         employees[tokenId].empDetails = empHash;
//         employees[tokenId].skillHash = _skillHash;
//         emit NFTMinted(_empId, employeeName, email, _skills, tokenId, empHash);
//     }

//     //Mint new Employee with Project
//     function mintEmployeeNFTwithProject(
//         bytes32 employeeName,
//         uint32 _empId,
//         bytes32 email,
//         bytes32 _skills,
//         bytes32 _projectName,
//         uint8 team_size,
//         bytes32 startTime, //UnixTime
//         bytes32 endTime //UnixTime
//     ) public nonReentrant onlyOwner {
//         require(employeeName.length != 0, "Employee name cannot be empty");
//         require(email.length != 0, "Email cannot be empty");
//         require(_skills.length != 0, "Skills cannot be empty");
//         require(_projectName.length != 0, "Project name cannot be empty");
//         require(startTime.length != 0, "start time cannot be empty");
//         require(endTime.length != 0, "end time cannot be empty");
//         require(!empIds[_empId], "Employee ID already exists");
//         bytes32 empHash = keccak256(abi.encode(employeeName, _empId, email));
//         bytes32 _skillHash = keccak256(_skills);
//         bytes32 projectHash = keccak256(abi.encode(_projectName, startTime, endTime, team_size));
//         bytes32 uriHash = keccak256(abi.encode(empHash, _skillHash, projectHash));
//         string memory uri = string(abi.encode(uriHash));
//         uint16 tokenId = NFT.safeMint(uri);
//         empIds[_empId] = true;
//         numOfProjects[tokenId] = 1;
//         employees[tokenId].empDetails = empHash;
//         employees[tokenId].skillHash = _skillHash;
//         employees[tokenId].projDetails[0] = projectHash;
//         employees[tokenId].exists[0] = true;
//         emit NFTMintedWithProject(_empId, employeeName, email, _skills, _projectName, team_size, startTime, endTime, tokenId, uriHash);
//     }

//     //Add Project to the Employee NFT
//     function addProject(
//         uint16 tokenId,
//         bytes32 _projectName,
//         uint8 team_size,
//         bytes32 startTime, //UnixTime
//         bytes32 endTime //UnixTime
//     ) public nonReentrant onlyOwner {
//         require(numOfProjects[tokenId] <= 5, "Cannot add more than 5 projects to an NFT");
//         require(_projectName.length != 0, "Project name cannot be empty");
//         require(startTime.length != 0, "start time cannot be empty");
//         require(endTime.length != 0, "end time cannot be empty");
//         bytes32 projectHash = keccak256(abi.encode(_projectName, startTime, endTime, team_size));
//         for (uint8 i = 0; i < 5; i++) {
//             if (!employees[tokenId].exists[i]) {
//                 employees[tokenId].projDetails[i] = projectHash;
//                 employees[tokenId].exists[i] = true;
//                 numOfProjects[tokenId] = numOfProjects[tokenId].add(1);
//                 bytes32 uriHash = keccak256(abi.encode(employees[tokenId].empDetails, employees[tokenId].skillHash, projectHash));
//                 emit projectAdded(tokenId, team_size, _projectName, startTime, endTime, uriHash);
//                 return;
//             }
//         }
//     }

//     //Edit Project of the Employee NFT
//     function editProject(
//         uint16 tokenId,
//         bytes32 _projectName,
//         uint8 team_size,
//         bytes32 startTime, //UnixTime
//         bytes32 endTime, //UnixTime
//         uint8 projectNumber
//     ) public nonReentrant onlyOwner {
//         require(projectNumber < 5, "Project number is invalid");
//         require(employees[tokenId].exists[projectNumber], "Project does not exist");
//         require(_projectName.length != 0, "Project name cannot be empty");
//         require(startTime.length != 0, "start time cannot be empty");
//         require(endTime.length != 0, "end time cannot be empty");
//         bytes32 projectHash = keccak256(abi.encode(_projectName, startTime, endTime, team_size));
//         employees[tokenId].projDetails[projectNumber] = projectHash;
//         bytes32 uriHash = keccak256(abi.encode(employees[tokenId].empDetails, employees[tokenId].skillHash, projectHash));
//         emit projectEdited(tokenId, team_size, _projectName, startTime, endTime, uriHash);
//     }

//     //Update Skills of the Employee
//     function updateSkills(uint16 tokenId, bytes32 _skills) public nonReentrant onlyOwner {
//         require(_skills.length != 0, "Skills cannot be empty");
//         bytes32  _skillHash = keccak256(_skills);
//         employees[tokenId].skillHash = _skillHash;
//         bytes32 uriHash = keccak256(abi.encode(employees[tokenId].empDetails, _skillHash));
//         emit skillUpdated(tokenId, _skills, uriHash);
//     }

//     //Burn Project of the Employee NFT
//     function burnProject(uint16 tokenId, uint8 projectNumber) public nonReentrant onlyOwner {
//         require(projectNumber < 5, "Project number is invalid");
//         require(employees[tokenId].exists[projectNumber], "Project does not exist");
//         employees[tokenId].exists[projectNumber] = false;
//         numOfProjects[tokenId] = numOfProjects[tokenId].sub(1);
//         emit buurnProject(tokenId, projectNumber);
//     }

//     //Burn Employee NFT
//     function burnNFT(uint16 tokenId) public nonReentrant onlyOwner {
//         NFT.burn(tokenId);
//         empIds[employees[tokenId].empDetails] = false;
//         for (uint8 i = 0; i < 5; i++) {
//             employees[tokenId].exists[i] = false;
//         }
//         numOfProjects[tokenId] = 0;
//         emit burnNFT(tokenId);
//     }
// }
