import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
RHFCheckbox.propTypes = {
 name: PropTypes.string.isRequired,
};
 
export function RHFCheckbox({ name, sx,label, ...other }) {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     render={({ field, fieldState: { error } }) => {
       return (
         <FormControl error={!!error} variant="standard" component="fieldset">
           <FormControlLabel
             control={<Checkbox {...field} checked={field.value} />}
             label={label}
             {...other}
             sx={sx}
           />
           <FormHelperText>{error?.message}</FormHelperText>
         </FormControl>
       );
     }}
   />
 );
}
RHFMultiCheckbox.propTypes = {
 name: PropTypes.string.isRequired,
 options: PropTypes.array.isRequired,
};
 
export function RHFMultiCheckbox({ name, options, row, ...other }) {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     render={({ field, fieldState: { error } }) => {
       const onSelected = (option) =>
         field.value.includes(option)
           ? field.value.filter((value) => value !== option)
           : [...field.value, option];
 
       return (
         <FormControl error={!!error} variant="standard" component="fieldset">
           <FormGroup row={row}>
             {options.map((option) => (
               <FormControlLabel
                 key={option.value}
                 control={
                   <Checkbox
                     checked={field.value?.includes(option.value)}
                     onChange={() => field.onChange(onSelected(option.value))}
                   />
                 }
                 label={option.label}
                 {...other}
               />
             ))}
           </FormGroup>
           <FormHelperText>{error?.message}</FormHelperText>
         </FormControl>
       );
     }}
   />
 );
}
