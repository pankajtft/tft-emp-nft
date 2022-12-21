import React from "react";
import { useFormContext } from "react-hook-form";
import {
  RHFTextField,	
  RHDatepicker,
  RHSelect
} from "../../Hook-form";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { RHFMultiCheckbox } from "../../Hook-form/RHFCheckbox";

const ProjectDetails = ({ handleSubmitForm, initialData }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Project Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RHFTextField
            required
            id="projectName"
            name="empDetail.projectName"
            label="Project Name"
            fullWidth
            variant="outlined"
            sx={{
              pb: 0 ,
            }}
          />
          <div className="flex flex-row my-2 mr-2 justify-around">
          <RHDatepicker
            required
            id="projectStartDate"
            name="empDetail.projectStartDate"
            label="Project Start Date"
            fullWidth
            variant="outlined-basic"
            sx={{
              pb: 1,
              mr:2
            }}
            className='mr-2 pr-4'
          />
          <RHDatepicker
            required
            id="projectEndDate"
            name="empDetail.projectEndDate"
            label="Project End Date"
            fullWidth
            variant="outlined"
            sx={{
              pb: 2,
            }}
          />
          </div>
          <RHFTextField
            required
            id="designation"
            name="empDetail.designation"
            label="Designation"
            fullWidth
            variant="outlined"
            sx={{
              pb: 2,
            }}
          />
         <RHSelect
          required
          fullWidth
          id="teamSize"
          name="empDetail.teamSize"
          label="Team size"
          variant="outlined"
          sx={{
            pb:2,
          }}
          className=" p-6"
          options={
            [{label:"2",value:"2"},
            {label:"3",value:"3"},
            {label:"4",value:"4"},
            {label:"5",value:"5"},
            {label:"6",value:"6"},
            {label:"7",value:"7"},
            {label:"8",value:"5"},
            {label:"9",value:"9"},
            {label:"10",value:"10"},
            {label:"11",value:"11"},
            {label:"12",value:"12"},
            {label:"13",value:"13"},
          ]
          }
          />

        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDetails;
