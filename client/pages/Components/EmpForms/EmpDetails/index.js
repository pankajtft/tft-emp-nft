import React from "react";
import { RHFTextField } from "../../Hook-form";
import Typography from "@mui/material/Typography";
import RHMultiCheckDropdown from "../../Hook-form/RHMultiCheckDropdown";

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
          <RHFTextField
            // required
            id="designation"
            name="empDetail.designation"
            label="Designation"
            fullWidth
            variant="outlined"
            sx={{
              pb: 2,
            }}
          />
          <RHMultiCheckDropdown
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
          />
     </div>
  );
};

export default EmpDetails;
