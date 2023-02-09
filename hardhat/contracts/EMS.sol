// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./NFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title EmployeeManagementContract
 * @author Anurag 
 * @dev Employee Management Contract allows users to create employeesNFTs and manage them
 */
contract EMS is
    IERC721Receiver
{
    EmployeeNFT internal NFT;
    address private _owner;
    bool public called;
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
        bytes32 empHash
    );
    event projectAdded(
        string projectName,
        string startTime,
        string endTime,
        uint32 empId,
        uint8 team_size,
        bytes32 uriHash
    );
    event projectEdited(
        string projectName,
        string startTime,
        string endTime,
        uint32 empId,
        uint8 team_size,
        bytes32 projectHash
    );
    event skillUpdated(uint32 empId, string skills, bytes32 skillHash);
    event buurnProject(uint32 empId, uint8 projectNumber);
    event burnNFT(uint32 empId);
    mapping(uint32 => Employee) employees;

    modifier onlyOwner() {
        require(msg.sender == _owner, "caller is not the owner !");
        _;
    }

    modifier validEmpId(uint32 empId) {
        require(empId >= 100000 && empId <= 999999, "emp ID must be valid");
        _;
    }

    modifier nonReentrant() {
        require(!called);
        called = true;
        _;
        called = false;
    }

    function initilize() public {
        NFT = new EmployeeNFT();
        _owner = msg.sender;
    }

    //Mint new Employee
    function mintEmployeeNFT(
        string memory employeeName,
        string memory email,
        string memory skills,
        uint32 empId
    )
        public
        nonReentrant
        onlyOwner
        validEmpId(empId)
    {
        require(
            bytes(employeeName).length > 0,
            "Employee name cannot be empty"
        );
        require(bytes(email).length > 0, "Email cannot be empty");
        require(bytes(skills).length > 0, "Skills cannot be empty");
        bytes32 empHash = keccak256(
            abi.encodePacked(employeeName, empId, email)
        );
        bytes32 skillHash = keccak256(abi.encodePacked(skills));
        bytes32 uriHash = keccak256(abi.encodePacked(empHash, skillHash));
        string memory uri = string(abi.encodePacked(uriHash));
        NFT.safeMint(uri, empId);
        employees[empId].empDetails = empHash;
        employees[empId].skillHash = skillHash;
        emit NFTMinted(employeeName, email, skills, empId, empHash);
    }

    //Update Skills
    function skillUpdate(uint32 empId, string memory skills)
        public
        onlyOwner
        validEmpId(empId)
    {
        require(bytes(skills).length > 0, "Skills cannot be empty");
        bytes32 uriHash;
        bytes32 skillHash = keccak256(abi.encodePacked(skills));
        employees[empId].skillHash = skillHash;
        if (employees[empId].projDetails.length == 0) {
            uriHash = keccak256(
                abi.encodePacked(
                    employees[empId].empDetails,
                    employees[empId].skillHash
                )
            );
        } else {
            uriHash = keccak256(
                abi.encodePacked(
                    employees[empId].empDetails,
                    employees[empId].projDetails[
                        employees[empId].currentProject
                    ],
                    employees[empId].skillHash
                )
            );
        }
        string memory uri = string(abi.encodePacked(uriHash));
        NFT.setURI(empId, uri);
        emit skillUpdated(empId, skills, skillHash);
    }

    //Add new Project
    // function AddProject(
    //     uint32 empId,
    //     uint8 team_size,
    //     string memory projectName,
    //     string memory startTime, //UnixTime
    //     string memory endTime //UnixTime
    // ) external
    // //  nonReentrant
    //   onlyOwner validEmpId(empId) {
    //     require(team_size >= 1, "Invalid team size");
    //     require(bytes(projectName).length > 0, "Project name cannot be empty");
    //     bytes32 projectHash = keccak256(
    //         abi.encodePacked(projectName, startTime, endTime, team_size)
    //     );
    //     employees[empId].projDetails.push(projectHash);
    //     uint8 index = uint8(employees[empId].projDetails.length - 1);
    //     employees[empId].exists.push(true);
    //     setcurrentProject(empId, index);
    //     bytes32 uriHash = keccak256(
    //         abi.encodePacked(
    //             employees[empId].empDetails,
    //             employees[empId].projDetails[index],
    //             employees[empId].skillHash
    //         )
    //     );
    //     string memory uri = string(abi.encodePacked(uriHash));
    //     NFT.setURI(empId, uri);
    //     emit projectAdded(
    //         projectName,
    //         startTime,
    //         endTime,
    //         empId,
    //         team_size,
    //         uriHash
    //     );
    // }

    // //Get Current Project
    // function getcurrentProject(uint32 empId)
    //     external
    //     view
    //     onlyOwner
    //     validEmpId(empId)
    //     returns (uint8)
    // {
    //     return employees[empId].currentProject;
    // }

    // //Set Current Project
    // function setcurrentProject(uint32 empId, uint8 projectID)
    //     public
    //     onlyOwner
    //     validEmpId(empId)
    // {
    //     // require(
    //     //     employees[empId].currentProject == uint8(0),
    //     //     "Current project is already set"
    //     // );
    //     require(
    //         projectID + 1 <= employees[empId].projDetails.length,
    //         "Invalid project ID"
    //     );
    //     require(employees[empId].exists[projectID], "Project not exists");
    //     employees[empId].currentProject = projectID;
    //     bytes32 uriHash = keccak256(
    //         abi.encodePacked(
    //             employees[empId].empDetails,
    //             employees[empId].projDetails[projectID],
    //             employees[empId].skillHash
    //         )
    //     );
    //     string memory uri = string(abi.encodePacked(uriHash));
    //     NFT.setURI(empId, uri);
    // }

    // //Edit project
    // function editProject(
    //     uint32 empId,
    //     uint8 team_size,
    //     string memory projectName,
    //     string memory startTime, //UnixTime
    //     string memory endTime, //UnixTime
    //     uint8 projectNumber
    // ) external onlyOwner validEmpId(empId) {
    //     require(team_size >= 1 && team_size <= 10, "Invalid team size");
    //     require(bytes(projectName).length > 0, "Project name cannot be empty");
    //     require(employees[empId].exists[projectNumber], "Project not exists");
    //     // require(
    //     //     projectNumber < employees[empId].projDetails.length,
    //     //     "Invalid project ID"
    //     // );
    //     bytes32 projectHash = keccak256(
    //         abi.encodePacked(projectName, startTime, endTime, team_size)
    //     );
    //     employees[empId].projDetails[projectNumber] = projectHash;
    //     emit projectEdited(
    //         projectName,
    //         startTime,
    //         endTime,
    //         empId,
    //         team_size,
    //         projectHash
    //     );
    // }

    // //Get All Projects Hash
    // function getAllProject(uint32 empId)
    //     public
    //     view
    //     onlyOwner
    //     validEmpId(empId)
    //     returns (bytes32[] memory)
    // {
    //     return employees[empId].projDetails;
    // }

    // //Return empId
    // // function returnToken() internal view returns (uint16) {
    // //     uint256 empId = NFT._empIdCounter();
    // //     return (uint16(empId) - 1);
    // // }
    //Overrides
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // function burnProject(uint32 empId, uint8 projectID)
    //     public
    //     onlyOwner
    //     validEmpId(empId)
    // {
    //     require(
    //         projectID < employees[empId].projDetails.length,
    //         "Invalid project ID"
    //     );
    //     require(employees[empId].exists[projectID], "Project not exists");
    //     employees[empId].projDetails[projectID] = "";
    //     employees[empId].exists[projectID] = false;
    //     emit buurnProject(empId, projectID);
    // }

    // //burn
    // function burn(uint32 empId) public virtual onlyOwner validEmpId(empId) {
    //     delete employees[empId];
    //     NFT.burn(empId);
    //     emit burnNFT(empId);
    // }

    // //Pure/View Functions
    function getNFT() public view onlyOwner returns (EmployeeNFT) {
        return NFT;
    }

    function getEmployee(uint32 empId) public view returns (bytes32) {
        Employee storage employee = employees[empId];
        return (employee.empDetails);
    }
}
