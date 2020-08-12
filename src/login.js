import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Imagen from './images/login.png';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Imagen})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function validacion(){
  var correo1=this.refs.correo1.getValue();
  console.log(correo1);
  /*if(correo1!=correo2){
  return(
  <Alert variant="filled" severity="error">
    El correo no coincide
  </Alert>
  ) 
  }*/
}
export default function SignInSide(props) {
  const classes = useStyles();
  const [correo1, setCorreo1]= useState("");
  const [correo2, setCorreo2]= useState("");
  const [alerta, setAlerta]= useState(null);
  const [error, setError]= useState()
  const { drizzle } = props;
  const handleChange = e => {
    setCorreo1(e.target.value);
  }
  const handleChange2 = e => {
    setCorreo2(e.target.value);
  }
  const validar=()=>{ 
      console.log(drizzle.web3.eth.getAccounts())
    if(correo1.toLowerCase()!=correo2.toLowerCase()){
      setAlerta(<Alert variant="filled" severity="error">Los dos campos no coinciden</Alert>);
    }else{
      if(!correo1.includes('@ucundinamarca.edu.co')){
        setAlerta(<Alert severity="warning">Correo Institucional no valido</Alert>)
      }else{
        setAlerta(null)
      }
      
    }
    
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {alerta}
          <Typography component="h1" variant="h5">
            E-Voting
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={correo1}    
              onChange={handleChange}       
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Institucional"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
             value={correo2}    
             onChange={handleChange2}  
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Repita Correo Institucional"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              onClick={validar}
              fullWidth
              variant="contained"
              color="primary"
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>               
                  Espere un correo con una llave unica que le permitira realizar su voto
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}