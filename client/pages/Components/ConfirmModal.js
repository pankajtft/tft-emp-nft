import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({handleClose,isOpen, onButtonPress, title , btnTitle1, btnTitle2}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title? title : "Do you want to add Project Details?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>onButtonPress(false)}
          variant="contained"
          className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
          >{btnTitle1 ? btnTitle1 : "No"}</Button>
          <Button onClick={()=>onButtonPress(true)} autoFocus
          variant="contained"
          className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
          >
            {btnTitle2 ? btnTitle2 : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}