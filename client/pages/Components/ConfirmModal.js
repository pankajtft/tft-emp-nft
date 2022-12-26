import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({handleClose,isOpen, onButtonPress}) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to add Project Details?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>onButtonPress(false)}
          className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
          >No</Button>
          <Button onClick={()=>onButtonPress(true)} autoFocus
          className=" bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-8 border border-purple-500 hover:border-transparent rounded"
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}