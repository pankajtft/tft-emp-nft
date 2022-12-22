import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormContext, Controller } from "react-hook-form";
 
const RHRadioButton = ({ name, row, label, options, ...others }) => {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     render={({ field, fieldState: { error } }) => (
       <>
         <FormControl error={!!error} variant="standard" component="fieldset">
           <FormLabel id="row-controlled-radio-buttons-group">
             {label}
           </FormLabel>
           <RadioGroup
             row={row}
             aria-labelledby="row-controlled-radio-buttons-group"
             value={field.value}
             onChange={field.onChange}
           >
             {options.map(({ label, value }, index) => (
               <FormControlLabel
                 key={index}
                 value={value}
                 control={<Radio />}
                 label={label}
               />
             ))}
           </RadioGroup>
           <FormHelperText>{error?.message}</FormHelperText>
         </FormControl>
       </>
     )}
   ></Controller>
 );
};
 
export default RHRadioButton;
 
RHRadioButton.propTypes = {
 name: PropTypes.string,
};
