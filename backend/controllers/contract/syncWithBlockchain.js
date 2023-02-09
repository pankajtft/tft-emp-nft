const mongoose = require("mongoose");
const Employee = require("../../models/employee");
const { skillsUpdate, editProject, AddProject } = require("../../index");
const { storeTransaction } = require("./helpers");
const { ethers } = require("ethers");

const addProjects = async (employee) => {
  if (employee?.projDetails) {
  for (const [index, project] of employee.projDetails.entries()) {
      if (!project?.isSynced) {
        console.log(project.projectName, " adding to contract.....");
        const contract_response = await AddProject(
          employee?.empDetail?.empCode,
          project.teamSize,
          project.projectName,
          project?.projectStartDate?.toString(),
          project?.projectEndDate?.toString()
        );
        await storeTransaction(
          employee._id,
          contract_response.transactionHash,
          contract_response.events[0].event,
          ethers.utils.formatEther(
            contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
          )
        );
        await Employee.updateOne(
          { _id: employee._id },
          { $set: { 
        [`projDetails.${index}.isSynced`]: true,
        [`projDetails.${index}.isEdited`]: false
    }}
        );
      } else if (project?.isEdited) {
        console.log(project.projectName, " updating in contract.....");
        const contract_response = await editProject(
          employee?.empDetail?.empCode,
          project.teamSize,
          project.projectName,
          project?.projectStartDate?.toString(),
          project?.projectEndDate?.toString(),
          index
        );
        await storeTransaction(
          employee._id,
          contract_response.transactionHash,
          contract_response.events[0].event,
          ethers.utils.formatEther(
            contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
          )
        );
        await Employee.updateOne(
          { _id: employee._id },
          {
            $set: {
              [`projDetails.${index}.isSynced`]: true,
              [`projDetails.${index}.isEdited`]: false,
            },
          }
        );
      }
    };
  }
};

const syncWithBlockchain = async (req, res) => {
  const queryId = mongoose.Types.ObjectId(req.params.id);
  const employee = await Employee.findById(queryId);
  res.send("working on it.....");
  if (!employee?.empDetail?.isSkillSynced) {
    const contract_response = await skillsUpdate(
      employee?.empDetail?.empCode,
      employee?.empDetail?.skills.join(",")
    );

    storeTransaction(
      queryId,
      contract_response.transactionHash,
      contract_response.events[0].event,
      ethers.utils.formatEther(
        contract_response.gasUsed.mul(contract_response.effectiveGasPrice)
      )
    );
    const skill_update = await Employee.findByIdAndUpdate(employee._id, {
      "empDetail.isSkillSynced": true,
    });
    console.log("skill updated....");
  }
  await addProjects(employee);
};

module.exports = { syncWithBlockchain };
