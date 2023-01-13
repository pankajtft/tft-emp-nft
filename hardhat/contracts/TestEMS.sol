pragma solidity ^0.8.9;
import "./EMS.sol";

contract TestEMS {
    EMS ems;

    constructor() {
        ems = new EMS();
    }

    // Test the mintEmployeeNFT() function
    function testMintEmployeeNFT() public {
        string memory employeeName = "John Doe";
        uint32 empId = 12345;
        string memory email = "johndoe@example.com";
        string memory skills = "solidity, smart contracts, blockchain";
        bytes32 expectedEmpHash = keccak256(
            abi.encode(employeeName, empId, email)
        );
        bytes32 expectedSkillHash = keccak256(abi.encode(skills));
        ems.mintEmployeeNFT(employeeName, empId, email, skills);
        Employee storage emp = ems.employees(0);
        assert(emp.empDetails == expectedEmpHash);
        assert(emp.skillHash == expectedSkillHash);
    }

    // Test the mintEmployeeNFTwithProject() function
    function testMintEmployeeNFTwithProject() public {
        string memory employeeName = "Jane Smith";
        uint32 empId = 56789;
        string memory email = "janesmith@example.com";
        string memory skills = "solidity, smart contracts, blockchain";
        string memory projectName = "Project X";
        uint8 teamSize = 8;
        string memory startTime = "1623457890";
        string memory endTime = "1623557890";
        bytes32 expectedEmpHash = keccak256(
            abi.encode(employeeName, empId, email)
        );
        bytes32 expectedSkillHash = keccak256(abi.encode(skills));
        bytes32 expectedProjectHash = keccak256(
            abi.encode(projectName, startTime, endTime, teamSize)
        );
        ems.mintEmployeeNFTwithProject(
            employeeName,
            empId,
            email,
            skills,
            projectName,
            teamSize,
            startTime,
            endTime
        );
        Employee storage emp = ems.employees(0);
        assert(emp.empDetails == expectedEmpHash);
        assert(emp.skillHash == expectedSkillHash);
        assert(emp.projDetails[0] == expectedProjectHash);
        assert(emp.exists[0] == true);
    }

    // Test the addProject() function
    function testAddProject() public {
        string memory projectName = "Project Y";
        uint8 teamSize = 6;
        string memory startTime = "1623457890";
        string memory endTime = "1623557890";
        bytes32 expectedProjectHash = keccak256(
            abi.encode(projectName, startTime, endTime, teamSize)
        );
        ems.addProject(0, projectName, teamSize, startTime, endTime);
        Employee storage emp = ems.employees(0);
        assert(emp.projDetails[1] == expectedProjectHash);
        assert(emp.exists[1] == true);
    }

    // Test the editProject() function
    function testEditProject() public {
        string memory projectName = "Project Z";
        uint8 teamSize = 10;
        string memory startTime = "1623457890";
        string memory endTime = "1623557890";
        bytes32 expectedProjectHash = keccak256(
            abi.encode(projectName, startTime, endTime, teamSize)
        );
        ems.editProject(0, 0, projectName, teamSize, startTime, endTime);
        Employee storage emp = ems.employees(0);
        assert(emp.projDetails[0] == expectedProjectHash);
        assert(emp.exists[0] == true);
    }

    function testBurnNFT() public {
        ems.burnNFT(0);
        assert(ems.NFT.ownerOf(0) == address(0));
        assert(ems.NFT.getApproved(0) == address(0));
        assert(ems.employees[0].empDetails == 0);
        assert(ems.employees[0].skillHash == 0);
        assert(ems.employees[0].exists[0] == false);
    }

    // Test the updateSkills() function
    function testUpdateSkills() public {
        string memory skills = "solidity, smart contracts, blockchain, testing";
        bytes32 expectedSkillHash = keccak256(abi.encode(skills));
        ems.updateSkills(0, skills);
        Employee storage emp = ems.employees(0);
        assert(emp.skillHash == expectedSkillHash);
    }

    // Test the burnProject() function
    function testBurnProject() public {
        ems.burnProject(0, 0);
        Employee storage emp = ems.employees(0);
        assert(emp.exists[0] == false);
    }

    // Test the onERC721Received() function
    function testOnERC721Received() public {
        address expectedReceiver = address(this);
        ems.onERC721Received(address(ems.NFT), 0, address(this));
        Employee storage emp = ems.employees(0);
        assert(ems.NFT.ownerOf(0) == expectedReceiver);
        assert(ems.NFT.getApproved(0) == expectedReceiver);
    }
}
