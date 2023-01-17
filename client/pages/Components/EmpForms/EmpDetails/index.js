import React from "react";
import { RHFTextField, RHSelect } from "../../Hook-form";
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
      <RHSelect
      required
      id="designation"
      name="empDetail.designation"
      label="Designation"
      options={
        [{label:"Unassigned", value:1},
        {label:"Mang",value:2}, 
        {label:"QA",value:3}, 
        {label:"IT",value:4}, 
        {label:"HR",value:5}, 
        {label:"Development",value:6}, 
        {label:"Admin",value:7}, 
        {label:"ACCOUNTS",value:8}, 
        {label:"SALES",value:9}, 
        {label:"LEGAL",value:10}, 
        {label:"DESIGN",value:11}, 
        {label:"TA",value:12}, 
        {label:"Product",value:13}, 
        {label:"Support",value:14}, 
        {label:"Analyst",value:15}, 
        {label:"Resources",value:16}]
      }
      sx={{
        pb: 1
      }}
      />
      {/* <RHSingleCheckDropDown
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
      /> */}
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
          pt:1,
          pb: 1,
        }}
      />
    </div>
  );
};

export default EmpDetails;
