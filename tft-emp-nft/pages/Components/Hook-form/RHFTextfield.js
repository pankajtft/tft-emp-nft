import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
 
RHFTextField.propTypes = {
 name: PropTypes.string,
};
 
export default function RHFTextField({ name,defaultValue,placeholder,disabled=false, ...other }) {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     defaultValue={defaultValue}
     render={({ field, fieldState: { error } }) => (
       <TextField
         {...field}
         fullWidth
         value={
           typeof field.value === 'number' && field.value === 0
             ? ''
             : field.value
         }
         error={!!error}
         helperText={error?.message}
         placeholder={placeholder}
         disabled={disabled}
         {...other}
       />
     )}
   />
 );
}
