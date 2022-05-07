import * as React from 'react';
import { updateCustomer } from "../services/data";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Edit({customer,setCustomer,openEdit,setOpenEdit,fetch2}){

  const {invoice_currency,cust_payment_terms}=customer;
  
  const changeHandlerEdit=(e)=>{
    const {name,value}=e.target;
    setCustomer({ ...customer, [name]: value });
  }

  const handleCloseEdit = async (update) => {
    if(update===true){
      let response=await updateCustomer(customer);
      fetch2();
    }
    setOpenEdit(false);
  }

  return (
    <div>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>Edit</DialogTitle>
        <DialogContent sx={{maxWidth:1010,backgroundColor:'#2b3e4c'}}>
          <TextField
            sx={{margin:2,width:220}}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'}}}
            name='invoice_currency'
            margin="dense"
            id="invoice_currency"
            label="Invoice Currency"
            type="text"
            value={invoice_currency}
            onChange={changeHandlerEdit}
            variant="filled"
          />
          <TextField
            sx={{margin:2,width:220}}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'}}}
            name='cust_payment_terms'
            margin="dense"
            id="cust_payment_terms"
            label="Customer Payment Terms"
            type="text"
            value={cust_payment_terms}
            onChange={changeHandlerEdit}
            variant="filled"
          />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c'}}>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseEdit(true)}>EDIT</Button>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseEdit(false)}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}