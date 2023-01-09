import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
 
const RHSelect = ({ name, label, options,defaultValue, ...others }) => {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     defaultValue={defaultValue}
     render={({ field,fieldState : {error} }) => (
       <TextField
         select
         fullWidth
         label={label}
         value={field.value}
         onChange={field.onChange}
         error={!!error}
         helperText={error?.message}
       >
         {options.map(({ label, value }, index) => (
           <MenuItem key={index} value={value}>
             {label}
           </MenuItem>
         ))}
       </TextField>
     )}
   ></Controller>
 );
};
 
export default RHSelect;
 
RHSelect.propTypes = {
 name: PropTypes.string,
};
