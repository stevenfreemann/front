import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';


import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';

import NotificationsIcon from '@material-ui/icons/Notifications';


import Deposits from './Deposits';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { logAdmin } from "../config/routes";
import Start from "./Start";
import Registro from "./Registro";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [candidatos, setCandidatos] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const [carga, setCarga] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [fail, setFail] = React.useState(false);


  useEffect(() => {
  
    var pass = props.match.params.pass;
    axios.get("/api/validacion/" + pass)
      .then(function (response) {
        console.log(response);
      }).catch(error => {
        return history.push(logAdmin());
      });
    console.log(candidatos);
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  function updateCandi(nombreStart, apellidoStart, infoStart, imagen, file) {
    setCandidatos([...candidatos, { nombre: nombreStart, apellido: apellidoStart, info: infoStart, url: imagen }]);
    setFiles([...files, { dataImage: file }]);
  }
  async function iniciarVotacion(fechaIni, fechaFin) {
    setCarga(true);
    let actual = new Date();
    console.log(actual);
    console.log(fechaIni);
    if (fechaIni > actual && fechaFin > fechaIni && candidatos.length > 1) {
      for (let x = 0; x < candidatos.length; x++) {
        console.log(files[x].dataImage);
        const formData = new FormData();
        formData.append('file', files[x].dataImage);
        await axios.post("/upload", formData)
          .then((response) => {
            //alert("Imagen subida correctamente");
            console.log(response);
            var nombre = candidatos[x].nombre + " " + candidatos[x].apellido;
            var url = "images/" + response.data;
            var descripcion = candidatos[x].info;
            console.log(nombre, url, descripcion);
            props.drizzle.contracts.Votacion.methods.agregarCandidato(
              nombre,
              url,
              descripcion
            ).send({ from: props.drizzleState.accounts[1], gas: 3141592 })
              .then(promise => {
                console.log("promesa: " + promise);
              });
          }).catch(error => {
            console.log("error upload image:" + error);
            setFail(true);
            setCarga(false);
          })
      }
    } else {
      alert("Fecha de inicio menor a la actual");
      setFail(true);
      setCarga(false);
      return null;
    }
    var ini = new Date(fechaIni).toISOString();
    var fin = new Date(fechaFin).toISOString();
    await axios.post("/fechas", {
      ini,
      fin
    }).then(function (response) {
      console.log("api fechas: " + response)
    }).catch(function (err) {
      console.log(err)
    });
    setOk(true);
    setCarga(false);
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //console.log(candidatos)
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={carga}
        message="Iniciando Votacion"
        action={
          <React.Fragment>
            <CircularProgress color="inherit" />
          </React.Fragment>
        }
      />
      <Snackbar open={ok} autoHideDuration={6000}>
        <Alert severity="success">
          Votacion Iniciada correctamente!
        </Alert>
      </Snackbar>
      <Snackbar open={fail} autoHideDuration={6000}>
        <Alert severity="error">
          Error al Iniciar Votacion!
        </Alert>
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Start iniciar={iniciarVotacion} />
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Deposits />
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={12} lg={12}>
              <Registro actualizar={updateCandi} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}