import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Controller, useFormContext } from "react-hook-form";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

RHMultiCheckDropdown.propTypes = {
  options: PropTypes.arrayOf({
    title: PropTypes.string,
    id: PropTypes.string,
  }),
  name: PropTypes.string,
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function RHMultiCheckDropdown({
  name,
  options,
  label,
  id,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({field: { onChange },fieldState: { error } }) => (
        <>
          <div >
            <Autocomplete
            multiple              
            id={id}
              options={options}
              disableCloseOnSelect
              getOptionLabel={option => option.title ? option.title : ""}
              onChange={(event, item) => {
                onChange(item);
            }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    label={label}
                    InputLabelProps={{
                      style: {
                        fontSize: "14px",
                        fontWeight: "400",
                      },
                    }}
                    size="large"
                    error={error}
                    helperText={error?.message}
                    {...other}
                  />
                </>
              )}
            />
          </div>
        </>
      )}
    />
  );
}