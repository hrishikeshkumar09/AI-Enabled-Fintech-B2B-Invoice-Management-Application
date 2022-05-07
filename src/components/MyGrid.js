import React, { useEffect, useState } from "react";
import { getData,predictBucket,updatePredictBucket } from "../services/data";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import Edit from "./Edit";
import Add from "./Add";
import AdvSearch from "./AdvSearch";
import DeleteDialog from "./DeleteDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import Paper from '@mui/material/Paper';
import Search from "./Search";
import AnalyticsDialog from "./AnalyticsDialog";


function MyGrid(){
    const [data, setData]=useState([]);
    const [customer, setCustomer]=useState({cust_number: '',invoice_currency: '', cust_payment_terms: ''});
    
    const [columns, setColumns]=useState([{field:"sl_no",headerName:"Sl\nNo",width:'70'},{field:"business_code",headerName:"Business Code"},
                                {field:"cust_number",headerName:"Customer Number"},{field:"clear_date",headerName:"Clear\nDate"},
                                {field:"business_year",headerName:"Business Year"},{field:"doc_id",headerName:"Document ID"},
                                {field:"posting_date",headerName:"Posting Date"},{field:"document_create_date",headerName:"Document Create  Date"},
                                {field:"due_in_date",headerName:"Due\nDate"},{field:"invoice_currency",headerName:"Invoice Currency"},
                                {field:"document_type",headerName:"Document Type"},{field:"posting_id",headerName:"Posting\nID"},
                                {field:"total_open_amount",headerName:"Total\nOpen\nAmount"},{field:"baseline_create_date",headerName:"Baseline\nCreate\nDate"},
                                {field:"cust_payment_terms",headerName:"Customer Payment Terms"},{field:"invoice_id",headerName:"Invoice\nID"},
                                {field:"aging_bucket",headerName:"Aging\nBucket"}]);
    const [openEdit,setOpenEdit]=useState(false);
    const [openAdd,setOpenAdd]=useState(false);
    const [openAdvSearch,setOpenAdvSearch]=useState(false);
    const [openDelDialog,setOpenDelDialog]=useState(false);
    const [openAnalytics,setOpenAnalytics]=useState(false);
    const [custMultiple,setCustMultiple]=useState([]);
    const [delItemsMultiple,setDelItemsMultiple]=useState([]);

    const [toggle,setToggle]=useState(true);
    const [toggleDel,setToggleDel]=useState(true);
    
    const [pageSize2, setPageSize] = React.useState(5);

    const fetch2=async ()=>{
      setData(await getData())
    }

    const editHandler=()=>{
        setOpenEdit(true);
    }

    const addHandler=()=>{
      setOpenAdd(true);
    }

    const advSearchHandler=()=>{
      setOpenAdvSearch(true);
    }

    const deleteHandler=()=>{
      setOpenDelDialog(true);
    }

    const predictHandler=async()=>{
      let response=await predictBucket(custMultiple);
      var temp_doc_id,temp_aging_bucket;
      for(let j=0;j<response.length;j++){
        temp_doc_id=parseInt(response[j]['doc_id']);
        temp_aging_bucket=response[j]['aging_bucket'];
        let res2=await updatePredictBucket(temp_doc_id,temp_aging_bucket);
      }
      fetch2();
    }

    const analyticsHandler=()=>{
      setOpenAnalytics(true);
    }

    const checkHandler= (itms) => {
        let editCustomer=data.filter(customer=>customer.sl_no==itms)[0];
        setCustomer(editCustomer);
    }

    const checkHandlerMultiple=(itms)=>{
      setDelItemsMultiple(itms);
      var cust=[];
      for(let i=0;i<itms.length;i++)
      {
        let multiple=data.filter(k=>k.sl_no==itms[i])[0];
        let m=multiple['doc_id'];
        cust.push(Number(m));
      }
      setCustMultiple(cust);
    }
    
    const checkHandler2=(itms) => {
      let k=itms[0];
      setToggle(true);
      setToggleDel(true);

      if(itms.length>0){
        if(itms.length==1){setToggle(false)}
        checkHandler(k);
        checkHandlerMultiple(itms);
        setToggleDel(false);
      }
    }

    useEffect(()=>{
        async function fetchData() {
        setData(await getData())
    }
    fetchData();
    },[]);


    return(<>
        <Paper elevation={3} sx={{backgroundColor:'#273d4a',paddingTop:3,marginTop:'0px'}}>
        <Button sx={{color:'white',width:'195px',height:40,borderRadius:'10px',borderTopRightRadius:0,borderBottomRightRadius:0,marginLeft:1.5}} variant='contained' onClick={predictHandler} disabled={toggleDel}><span style={{color:'white'}}>PREDICT</span></Button>
        <Button sx={{color:'white',width:'195px',height:40,border:1.5,borderColor: "#22A7F0",borderRadius:0,borderRight:0}} variant='outlined' onClick={analyticsHandler}>ANALYTICS VIEW</Button>
        <Button sx={{color:'white',width:'195px',height:40,border:1.5,borderColor: "#22A7F0",borderRadius:'10px',borderTopLeftRadius:0,borderBottomLeftRadius:0}} variant='outlined' onClick={advSearchHandler}>ADVANCE SEARCH</Button>
        <Button sx={{height:40,marginLeft:1,marginRight:0,borderWidth:'2px'}} variant="outlined" onClick={fetch2}><RefreshIcon/></Button>
        <Search fetch2={fetch2} setData={setData}/>
        <Button sx={{color:'white',width:'195px',height:40,border:1.5,borderColor: "#22A7F0"}} variant='outlined' onClick={addHandler}>ADD</Button>
        <Button sx={{color:'white',width:'195px',height:40,border:1.5,borderColor: "#22A7F0"}} variant='outlined' onClick={editHandler} disabled={toggle}><span style={{color:'white'}}>EDIT</span></Button>
        <Button sx={{color:'white',width:'195px',height:40,border:1.5,borderColor: "#22A7F0"}} variant='outlined' onClick={deleteHandler} disabled={toggleDel}><span style={{color:'white'}}>DELETE</span></Button>
        

        <Edit customer={customer} setCustomer={setCustomer} openEdit={openEdit} setOpenEdit={setOpenEdit} fetch2={fetch2}/>
        
        <Add openAdd={openAdd} setOpenAdd={setOpenAdd} fetch2={fetch2}/>
         
        <DeleteDialog delItemsMultiple={delItemsMultiple} openDelDialog={openDelDialog} setOpenDelDialog={setOpenDelDialog} fetch2={fetch2}/>

        <AdvSearch openAdvSearch={openAdvSearch} setOpenAdvSearch={setOpenAdvSearch} setData={setData}/>

        <AnalyticsDialog openAnalytics={openAnalytics} setOpenAnalytics={setOpenAnalytics}/>
        
        {<div style={{height: 344, width: '100%'}}>
            <DataGrid
                pagination
                pageSize={pageSize2}
                rowsPerPageOptions= {[5,10,25,50,100]}
                onPageSizeChange={(number)=>{
                  setPageSize(number);
                }}
                
                rows={data}
                rowHeight={40}
                headerHeight={70}
                sx={{
                  '& .MuiDataGrid-columnHeaderTitle': {
                      textOverflow: "clip",
                      whiteSpace: "break-spaces",
                      lineHeight: 1.5,
                      textAlign: 'left'
                  },backgroundColor:'#79888f',color: 'white',
                  '& .MuiDataGrid-columnSeparator':{
                    visibility: "hidden"
                  },
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none'
                  },
                  '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none'
                  },
                  '& .MuiDataGrid-checkboxInput':{
                    color: 'white'
                  },
                  '& .MuiTablePagination-root':{
                    color:'white'
                  },
                  '& .MuiDataGrid-footerContainer':{
                    backgroundColor:'#273d4a',color:"white"
                  },
                  '& .MuiDataGrid-columnHeaders':{
                    backgroundColor:'#273d4a',borderRadius:0,color:'white'
                  },
                  '& .MuiDataGrid-row':{
                    backgroundColor:'#273d4a',color:'white'
                  },
                  '& .MuiDataGrid-row.Mui-selected': {
                    backgroundColor:'#25435b'
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor:'#25435b'
                  },
                  '& .MuiDataGrid-row.Mui-selected:hover': {
                    backgroundColor:'#25435b'
                  },
                  border: 0,
                }}
                
                columns={columns}
                getRowId={(data) => data.sl_no}

                checkboxSelection
                disableColumnMenu={true}
                disableColumnSelector={true}
                onSelectionModelChange={itms=>checkHandler2(itms)}
            />
        </div> }
        </Paper>
        </>
    )
}

export default MyGrid;