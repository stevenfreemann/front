import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Image from './images/faca12.jpg';
import Image2 from './images/fondoEdit.png';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
function Copyright() {
  return (
    <Typography variant="body2" color="initial">
      {'Copyright © '}
      
        Universidad de Cundinamarca Ext Facatativa

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: 1656,
    width: 1300,
    backgroundImage: `url(${Image})`
  },
  root: {
    display: 'flex',
    maxWidth: 'sm',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${Image2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%"
  },
  back:{
    display: 'flex'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    color: grey[800]
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'green' ? theme.palette.primary[200] : indigo[900],
  },
  fooColor:{
    color: grey[50]
  }
}));

export default function StickyFooter() {
  const classes = useStyles();
  

  return (
    <Paper className={classes.root}>
         <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm"> 
      
        <Typography variant="h2" component="h1" gutterBottom >
          E-Voting UDEC
        </Typography>
      
        <Typography variant="h5" component="h2" gutterBottom >
          {'Aplicacion Descentralizada de votacion para representante estudiantil.'}
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/login">
          Realizar Voto
        </Button> 
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm" className={classes.fooColor}>
          <Copyright />
        </Container>
      </footer>
    </Paper>
  );
}