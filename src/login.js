import React, { useState, useEffect } from 'react';
import Email from './email';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Imagen from './images/login.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { countDown } from "./config/routes";


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

export default function SignInSide(props){
  const history = useHistory();
  const classes = useStyles();
  const [correo2, setCorreo2] = useState("");
  const [correo1, setCorreo1] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState()
  const [generate, setGenerate] = useState("mi contraseña");
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    let actual = new Date();
    console.log(actual);
    axios.get("/api/obtFechas")
      .then(function (response) {
        var dateIni = new Date(response.data.inicio);
        var dateFin = new Date(response.data.fin);
        console.log(dateIni);
        if(dateIni>actual || actual>dateFin){
          console.log("entro");
          return history.push(countDown());
        }
      }).catch(error => {
        console.log(error)
      });
  },[])
  const handleChange = e => {
    setCorreo1(e.target.value);
  }
  const handleChange2 = e => {
    setCorreo2(e.target.value);
  } 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
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
              error={correo1 === "@ucundinamarca.edu.co"}
              helperText={correo1 === "@ucundinamarca.edu.co" ? 'Empty!' : ' '}
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
            {<Email 
              drizzle={props.drizzle}
              drizzleState={props.drizzleState}
              correo={correo1} 
              correo2={correo2}></Email>}
            <Grid container>
              <br />          
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}