import React from "react";
import { RHFTextField, RHDatepicker } from "../../Hook-form";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RHMultiCheckDropdown from "../../Hook-form/RHMultiCheckDropdown";

const EmpDetails = ({ handleSubmitForm, initialData }) => {
  return (
    <div className="">
      <Typography variant="h6" gutterBottom>
        Employee Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RHFTextField
            required
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
          <RHMultiCheckDropdown
            name="empDetail.skills"
            label="Skills"
            options={
            [{title:"React"},
            {title: "Vue"},
            {title:"React Native"},
            {title: "Mongo"},
            {title: "Node"},
            {title:"Blockchain"},
            {title:"Solidity"},
            {title:"JavaScript"},
            {title:"AWS"}]
            } 
            id="skills"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EmpDetails;
