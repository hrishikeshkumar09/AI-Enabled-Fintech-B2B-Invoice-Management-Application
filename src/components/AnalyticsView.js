import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Bar,Pie} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Analytics({openAnalyticsView,setOpenAnalyticsView,amount,num,curr}) {
  const handleClose = () => {
    setOpenAnalyticsView(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openAnalyticsView}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{backgroundColor:'#2b3e4c',color:'white'}}>{"Analytics View"}</DialogTitle>
        <DialogContent sx={{backgroundColor:'#f6f1db'}}>
            <div style={{textAlign:'center'}}>Analytics View</div>
            <Bar
            options={{maintainAspectRatio:false}}
            data={{
                labels: ["Unilever","Johnson and Johnson","Bose","Kellog's","Sony","Puma"],
                datasets: [
                    {
                        label:'No of Customers',
                        data: num,
                        backgroundColor: '#f0a8b1',
                        minBarLength:5,
                    },
                    {
                        label:'Total Open Amount',
                        data: amount,
                        backgroundColor: '#73bedd',
                        minBarLength:5
                    }
                    ],
            }}
            />
            <div style={{marginLeft:"60px",marginTop:"10px",color:'black'}}>Total Open Amount= Total Open Amount * 10⁴</div>
          <br/><br/>
          <Pie
            options={{maintainAspectRatio:false}}
            data={{
                labels: ["USD","CAD"],
                datasets: [
                    {
                        data: curr,
                        backgroundColor: ['#f0a8b1','#73bedd']
                    }
                    ],
            }}
            />
        </DialogContent>
        <DialogActions sx={{backgroundColor:'#2b3e4c'}}>
          <Button sx={{color:'white',width:'100%',height:45,borderColor:'white'}} variant='outlined' onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}