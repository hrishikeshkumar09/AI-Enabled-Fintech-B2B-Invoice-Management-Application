import * as React from 'react';
import {deleteCustomer} from "../services/data";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({delItemsMultiple,openDelDialog,setOpenDelDialog,fetch2}) {

  const handleClose = async (e) => {
    if(e===true){
      for(let i=0;i<delItemsMultiple.length;i++){
        let response=await deleteCustomer(delItemsMultiple[i]);
      }
      fetch2();
    }
    setOpenDelDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDelDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>{"Delete Records?"}</DialogTitle>
        <DialogContent sx={{backgroundColor:'#2b3e4c',color:'white'}}>
          <DialogContentText sx={{color:'white'}} id="alert-dialog-slide-description">
            Are you sure you want to delete these record[s]?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c',color:'white'}}>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleClose(false)}>CANCEL</Button>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleClose(true)}>DELETE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

