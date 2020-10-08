import React, { useRef, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TimerImage from './images/timer.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import axios from 'axios';
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    display: 'flex',
    maxWidth: 'sm',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${TimerImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%"
  },
  back: {
    display: 'flex'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    color: grey[50]
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'green' ? theme.palette.primary[200] : indigo[900],
  },
  fooColor: {
    color: grey[50]
  }
}));

export default function StickyFooter() {
  const classes = useStyles();
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  const [countDownDate, setCountDownDate] = useState(null);

  let interval = useRef();
  useEffect(() => {
    if (countDownDate === null) {
      axios.get("/api/obtFechas")
        .then(function (response) {
          setCountDownDate(response.data.inicio);
        }).catch(error => {
          console.log(error)
        })
    }
    startTimer();
    return () => {
      clearInterval(interval.current);
    }
  });
  const back = () => {

  };
  const startTimer = () => {

    const fin = new Date(countDownDate).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = fin - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor(distance % (1000 * 60 * 60)) / (1000 * 60);
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        //terminar timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(~~minutes);
        setTimerSeconds(seconds);
      }


    }, 1000)
  }

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom >
          Votacion Inicia en:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {'Dias'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {'Horas'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {'Minutos'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {'Segundos'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {timerDays}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {timerHours}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {timerMinutes}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" component="h3" gutterBottom >
              {timerSeconds}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" component={Link} to="/">
              Volver a Inicio
        </Button>
          </Grid>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm" className={classes.fooColor}>
          <Copyright />
        </Container>
      </footer>
    </Paper>
  );
}