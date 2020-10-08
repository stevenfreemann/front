import React,{ useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {dashboard, logAdmin} from "../config/routes";
import {useHistory} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
   
        Your Website
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = e => {
    setUsuario(e.target.value);
    console.log(usuario);
  }
  const handleChange2 = e => {
    setPassword(e.target.value);
  }

 async function autenticacion(){
    await axios.post("/api/credenciales", {
      usuario,
      password
    }).then(function (response) {
      console.log(response.data);
      return history.push(dashboard()+"/"+response.data);
    }).catch(error => {
      return history.push(logAdmin());
    });
  }
  
  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Administrador
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={usuario}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Usuario"
            name="usuario"
            autoComplete="usuario"
            autoFocus
          />
          <TextField
            value={password}
            onChange={handleChange2}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
          onClick={autenticacion}
          fullWidth
          variant="contained"
          color="primary"  
          >
          Ingresar
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}