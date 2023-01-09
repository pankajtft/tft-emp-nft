import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
 
import { useFormContext, Controller } from "react-hook-form";
 
const RHDatepicker = ({ name, label, defaultValue,...others }) => {
 const { control } = useFormContext();
 
 return (
   <Controller
     name={name}
     control={control}
     defaultValue={defaultValue}
     render={({ field, fieldState: { error } }) => (
       <LocalizationProvider dateAdapter={AdapterMoment}>
         <DesktopDatePicker
           label={label}
           inputFormat="DD/MM/YYYY"
           value={field.value}
           onChange={field.onChange}
           renderInput={(params) => (
             <TextField
              //  error={error}
               helperText={error?.message}
               {...params}
             />
           )}
           {...others}
         />
       </LocalizationProvider>
     )}
   />
 );
};
 
export default RHDatepicker;
