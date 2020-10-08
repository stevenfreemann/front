import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {es} from "date-fns/locale/";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(5),
    maxWidth: '150px', 
    maxHeight: '50px', 
    minWidth: '150px', 
    minHeight: '50px'
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0.1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  var today = new Date();
  //const [hoy, setHoy]= React.useState(new Date(yyyy+'-'+mm+'-'+dd));
  const [time1, setTime1]= React.useState(null);
  const [time2, setTime2]= React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };
  const handleTimeChange = (date) => {
    setTime1(date);
  };
  const handleTimeChange2 = (date) => {
    setTime2(date);
  };
  useEffect(() => {
    
  },[])
  const fechas = () =>{
    try{
    var dd1=selectedDate.getDate();
    var mm1=selectedDate.getMonth();
    var yy1=selectedDate.getFullYear();
    var t1=time1.getHours() + ":" + time1.getMinutes() + ":" + time1.getSeconds();
    var t2=time2.getHours() + ":" + time2.getMinutes() + ":" + time2.getSeconds();
    console.log(t1,t2);
    let fechaIni=new Date(yy1,mm1,dd1);
    fechaIni.setHours(time1.getHours());
    fechaIni.setMinutes(time1.getMinutes());
    var dd2=selectedDate2.getDate();
    var mm2=selectedDate2.getMonth();
    var yy2=selectedDate2.getFullYear();
    let fechaFin=new Date(yy2,mm2,dd2);
    fechaFin.setHours(time2.getHours());
    fechaFin.setMinutes(time2.getMinutes());
    console.log(fechaIni+"------------"+fechaFin);
    props.iniciar(fechaIni,fechaFin);
    }catch(error){
      console.log(error);
      alert('Necesita ingresar las fechas de votacion');
    } 
  
  }
  return (

   
    <div className={classes.root}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
            Programar Eleccion
        </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
      <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Fecha Inicio"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Fecha Fin"
          format="MM/dd/yyyy"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora Inicio"
          value={time1}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora Fin"
          value={time2}
          onChange={handleTimeChange2}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4}>
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={fechas}>
          Iniciar
        </Button>
        </Grid>
    </Grid>
    </div>
    
  );
}