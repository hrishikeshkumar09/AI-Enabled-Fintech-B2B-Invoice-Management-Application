import React, { useState } from "react";
import { analyseCustomer } from "../services/data";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Analytics from "./AnalyticsView";

const usecss={
  txtColor: {
    color:"white",
  },
  marg: {
    marginLeft: "180px",
    color:"white"
  },
  margInv: {
    marginLeft: "110px",
    color:"white"
  }
}

export default function AnalyticsDialog({openAnalytics,setOpenAnalytics}){

  const [customerAnalytics, setCustomerAnalytics]=useState({ clear_date_start: '',clear_date_end: '', due_date_start: '',due_date_end: '', baseline_create_date_start: '',baseline_create_date_end: '', invoice_currency: ''});
  const [clearDateStart,setClearDateStart]=useState(new Date());
  const [clearDateEnd,setClearDateEnd]=useState(new Date());
  const [dueDateStart,setDueDateStart]=useState(new Date());
  const [dueDateEnd,setDueDateEnd]=useState(new Date());
  const [baselineCreateDateStart,setBaselineCreateDateStart]=useState(new Date());
  const [baselineCreateDateEnd,setBaselineCreateDateEnd]=useState(new Date());
  const [openAnalyticsView,setOpenAnalyticsView]=useState(false);
  const [amount,setAmount]=useState([]);
  const [num,setNum]=useState([]);
  const [curr,setCurr]=useState([]);

  const {invoice_currency}=customerAnalytics;

  const changeHandlerAnalytics=(e)=>{
    const {name,value}=e.target;
    setCustomerAnalytics({ ...customerAnalytics, [name]: value });
  }

  const changeHandlerAnalyticsDate=(date,className)=>{
    if(className==='clear_date_start')
      setClearDateStart(date);
    if(className==='clear_date_end')
      setClearDateEnd(date);
    if(className==='due_date_start')
      setDueDateStart(date);
    if(className==='due_date_end')
      setDueDateEnd(date);
    if(className==='baseline_create_date_start')
      setBaselineCreateDateStart(date);
    if(className==='baseline_create_date_end')
      setBaselineCreateDateEnd(date);

    var finaldate =date.getFullYear()+ '-' + (date.getMonth()+1) + '-' + date.getDate();
    setCustomerAnalytics({ ...customerAnalytics, [className]: finaldate });
  }

  const handleCloseAnalytics = async (k) => {
    if(k===true){
      let response=await analyseCustomer(customerAnalytics);
      var amt=[];
      for(let i=0;i<6;i++)
      {
        amt[i]=response.amount[i]/10000;
      }
      
      setAmount(amt);
      setNum(response.customers);
      setCurr(response.currency); 
      setOpenAnalyticsView(true);
    }
    else{setOpenAnalyticsView(false);}
    setOpenAnalytics(false);
  }

  return (
      <>
      <Analytics openAnalyticsView={openAnalyticsView} setOpenAnalyticsView={setOpenAnalyticsView} amount={amount} num={num} curr={curr}/>
    <div>
      <Dialog open={openAnalytics} onClose={handleCloseAnalytics}>
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>Analytics View</DialogTitle>
        <DialogContent sx={{maxWidth:510,backgroundColor:'#2b3e4c'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <span>
          <span style={usecss.txtColor}>Clear Date</span><span style={usecss.marg}>Due Date</span>
          <DatePicker
            label="Clear Date Start"
            value={clearDateStart}
            onChange={date=>changeHandlerAnalyticsDate(date,'clear_date_start')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />
  
          <DatePicker
            label="Due Date Start"
            onChange={ date=>changeHandlerAnalyticsDate(date,'due_date_start')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            value={dueDateStart}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />
        </span>
        <span>
        <DatePicker
            label="Clear Date End"
            value={clearDateEnd}
            onChange={date=>changeHandlerAnalyticsDate(date,'clear_date_end')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />

          <DatePicker
            label="Due Date End"
            onChange={ date=>changeHandlerAnalyticsDate(date,'due_date_end')}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
            value={dueDateEnd}
            renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
          />
        </span>
        <span>
            <span style={usecss.txtColor}>Baseline Create Date</span><span style={usecss.margInv}>Invoice Currency</span>
            <DatePicker
                label="Baseline Create Date Start"
                value={baselineCreateDateStart}
                onChange={date=>changeHandlerAnalyticsDate(date,'baseline_create_date_start')}
                InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
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
              onChange={changeHandlerAnalytics}
              variant="filled"
            />
        </span>
        <span>
        <DatePicker
                label="Baseline Create Date End"
                value={baselineCreateDateEnd}
                onChange={date=>changeHandlerAnalyticsDate(date,'baseline_create_date_end')}
                InputProps={{ style: {backgroundColor:'white',borderRadius:'4px'} }}
                renderInput={(params) => <TextField {...params} sx={{margin:2,width:220}} variant="filled"/>}
            />
        </span>
        </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c'}}>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAnalytics(true)}>SUBMIT</Button>
          <Button sx={{color:'white',width:'50%',height:45,borderColor:'white'}} variant='outlined' onClick={()=>handleCloseAnalytics(false)}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}