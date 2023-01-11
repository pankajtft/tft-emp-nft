import React from "react";
import { RHFTextField } from "../../Hook-form";
import Typography from "@mui/material/Typography";
import RHMultiCheckDropdown from "../../Hook-form/RHMultiCheckDropdown";
import RHSingleCheckDropDown from "../../Hook-form/RHSingleCheckDropDown";

const EmpDetails = ({ handleSubmitForm, initialData }) => {
  return (
    <div className="">
      <Typography variant="h6" gutterBottom>
        Employee Details
      </Typography>
      <RHFTextField
        id="name"
        name="empDetail.name"
        label="Name"
        fullWidth
        variant="outlined"
        sx={{
          pb: 1,
        }}
      />
      <RHFTextField
        required
        id="email"
        name="empDetail.email"
        label="Email"
        fullWidth
        variant="outlined"
        sx={{
          pb: 1,
        }}
      />
      <RHFTextField
        required
        id="empCode"
        name="empDetail.empCode"
        label="Employee Code"
        fullWidth
        variant="outlined"
        sx={{
          pb: 1,
        }}
      />
      <RHSingleCheckDropDown
        required
        id="designation"
        name="empDetail.designation"
        label="Designation"
        options={
          ["Unassigned",
          "Mang", 
          "QA", 
          "IT", "HR", 
          "Development", 
          "Admin", 
          "ACCOUNTS", 
          "SALES", 
          "LEGAL", 
          "DESIGN", 
          "TA", 
          "Product", 
          "Support", 
          "Analyst", 
          "Resources"]
        }
        sx={{
          pb: 1,
        }}
      />
      <RHMultiCheckDropdown
        required
        name="empDetail.skills"
        label="Skills"
        options={
          ["React",
            "Vue",
            "React Native",
            "Mongo",
            "Node",
            "Blockchain",
            "Solidity",
            "JavaScript",
            "AWS"]
        }
        id="skills"
        sx={{
          pb: 1,
        }}
      />
    </div>
  );
};

export default EmpDetails;
