import React, { useState } from "react";
import { addCustomer} from "../services/data";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Add({openAdd,setOpenAdd,fetch2}){

  const [customerAdd, setCustomerAdd]=useState({business_code: '', cust_number: '', clear_date: '', business_year: '', 
  document_id: '', posting_date: '', document_create_date: '', due_date: '', invoice_currency: '', document_type: '', 
  posting_id: '', total_open_amount: '', baseline_create_date: '', cust_payment_terms: '', invoice_id: ''});
  const [clearDate,setClearDate]=useState(new Date());
  const [postingDate,setPostingDate]=useState(new Date());
  const [documentCreateDate,setDocumentCreateDate]=useState(new Date());
  const [dueDate,setDueDate]=useState(new Date());
  const [baselineCreateDate,setBaselineCreateDate]=useState(new Date());

  const {business_code,cust_number,business_year,document_id,invoice_currency,document_type,posting_id,total_open_amount,cust_payment_terms,invoice_id}=customerAdd;

  const changeHandlerAdd=(e)=>{
    const {name,value}=e.target;
    setCustomerAdd({ ...customerAdd, [name]: value });
  }

  const changeHandlerAddDate=(date,className)=>{
    if(className==='clear_date')
      setClearDate(date);
    if(className==='posting_date')
      setPostingDate(date);
    if(className==='document_create_date')
      setDocumentCreateDate(date);
    if(className==='due_date')
      setDueDate(date);
    if(className==='baseline_create_date')
      setBaselineCreateDate(date);

    var finaldate =date.getFullYear()+ '-' + (date.getMonth()+1) + '-' + date.getDate();
    setCustomerAdd({ ...customerAdd, [className]: finaldate });
  }

  const handleCloseAdd = async (add) => {
    if(add===true){
      let responseAdd=await addCustomer(customerAdd);
      fetch2();
    }
    setOpenAdd(false);
  }

  return (
    <div>
      <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="lg" >
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>Add</DialogTitle>
        <DialogContent sx={{maxWidth:1010,backgroundColor:'#2b3e4c'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
              sx={{margin:2,width:220,borderRadius:20}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              name='business_code'
              margin="dense"
              id="business_code"
              label="Business Code"
              value={business_code}
              type="text"
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              name='cust_number'
              id="cust_number"
              label="Customer Number"
              type="text"
              value={cust_number}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <DatePicker
            label="Clear Date"
            value={clearDate}
            onChange={date=>changeHandlerAddDate(date,'clear_date')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
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
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="document_id"
              label="Document Id"
              type="text"
              name='document_id'
              value={document_id}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <DatePicker
            label="Posting Date"
            value={postingDate}
            onChange={date=>changeHandlerAddDate(date,'posting_date')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2, width:220}} variant="filled"/>}
          />
          <DatePicker
            label="Document Create Date"
            value={documentCreateDate}
            onChange={date=>changeHandlerAddDate(date,'document_create_date')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant='filled'/>}
          />
          <DatePicker
            label="Due Date"
            onChange={ date=>changeHandlerAddDate(date,'due_date')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            value={dueDate}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="invoice_currency"
              label="Invoice Currency"
              type="text"
              name='invoice_currency'
              value={invoice_currency}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="document_type"
              label="Document Type"
              type="text"
              name='document_type'
              value={document_type}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="posting_id"
              label="Posting Id"
              type="text"
              name='posting_id'
              value={posting_id}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="total_open_amount"
              label="Total Open Amount"
              type="text"
              name='total_open_amount'
              value={total_open_amount}
              onChange={changeHandlerAdd}
              variant="filled"
            />
          <DatePicker
            label="Baseline Create Date"
            value={baselineCreateDate}
            onChange={date=>changeHandlerAddDate(date,'baseline_create_date')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />
          <TextField
              sx={{margin:2,width:220}}
              InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
              margin="dense"
              id="cust_payment_terms"
              label="Customer Payment Terms"
              type="text"
              name='cust_payment_terms'
              value={cust_payment_terms}
              onChange={changeHandlerAdd}
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
              onChange={changeHandlerAdd}
              variant="filled"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c'}}>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAdd(true)}>ADD</Button>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAdd(false)}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}