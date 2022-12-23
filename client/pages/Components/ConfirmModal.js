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
          <Button onClick={()=>onButtonPress(false)}>No</Button>
          <Button onClick={()=>onButtonPress(true)} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}