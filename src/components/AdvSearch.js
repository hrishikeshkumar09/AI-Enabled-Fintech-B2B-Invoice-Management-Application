import React, { useState } from "react";
import {advSearchCustomer} from "../services/data";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AdvSearch({openAdvSearch, setOpenAdvSearch,setData}){

  const [customerAdvSearch, setCustomerAdvSearch]=useState({cust_number: '',business_year: '',doc_id: '',invoice_id: ''});
  const {cust_number,business_year,doc_id,invoice_id}=customerAdvSearch;

  const changeHandlerAdvSearch=(e)=>{
    const {name,value}=e.target;
    setCustomerAdvSearch({ ...customerAdvSearch, [name]: value });
  }

  const handleCloseAdvSearch = async (advSearch) => {
    if(advSearch===true){
      setData(await advSearchCustomer(customerAdvSearch));
    }
    setOpenAdvSearch(false);
  }

  return (
    <div>
      <Dialog open={openAdvSearch} onClose={handleCloseAdvSearch} maxWidth="sm" >
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>Advance Search</DialogTitle>
        <DialogContent sx={{maxWidth:510,backgroundColor:'#2b3e4c'}}>
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              name='cust_number'
              id="cust_number"
              label="Customer Number"
              type="text"
              value={cust_number}
              onChange={changeHandlerAdvSearch}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="business_year"
              label="Business Year"
              type="text"
              name='business_year'
              value={business_year}
              onChange={changeHandlerAdvSearch}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="doc_id"
              label="Document Id"
              type="text"
              name='doc_id'
              value={doc_id}
              onChange={changeHandlerAdvSearch}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'}}}
              margin="dense"
              id="invoice_id"
              label="Invoice Id"
              type="text"
              name='invoice_id'
              value={invoice_id}
              onChange={changeHandlerAdvSearch}
              variant="filled"
            />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c'}}>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAdvSearch(true)}>SEARCH</Button>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAdvSearch(false)}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}