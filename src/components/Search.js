import React, { useState } from "react";
import { searchCustomer } from "../services/data";
import TextField from '@mui/material/TextField';

export default function Search({fetch2,setData}){

  const [cust_number, setCustomer]=useState('');

  const changeHandlerSearch= async (e)=>{
    setCustomer(e.target.value);
    if(e.target.value=="")
      fetch2();
    else if((e.target.value).length===9)
      setData(await searchCustomer(e.target.value));
  }

  return (
          <TextField
            sx={{marginTop:0,width:240,height:10,marginBottom:6,marginLeft:1,marginRight: 3}}
            InputProps={{ style: {backgroundColor:'white',borderRadius:'10px',fontSize:15}}}
            InputLabelProps={{ style: { fontSize: 15} }}
            name='cust_number'
            margin="dense"
            id="cust_number"
            label="Search Customer Id"
            type="text"
            value={cust_number}
            onChange={changeHandlerSearch}
            variant="filled"
          />      
  );
}