import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Image2 from './images/fondoResult.jpg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import indigo from '@material-ui/core/colors/indigo';
import MaterialTable from 'material-table';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

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
  back: {
    display: 'flex'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    color: grey[900]
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

export default function Resultados(props) {
  const classes = useStyles();
  const [postulados, setPostulados] = useState([]);
  const [ncandidatos, setNcandidatos] = useState(null);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nombre', field: 'nombre' },
      { title: 'Apellido', field: 'apellido' },
      { title: 'Informacion', field: 'info' },
      { title: 'Imagen', field: 'imagen' }
    ],
    data: []
  });

  useEffect(() => {
    const { drizzle} = props;
    var c = {};

    drizzle.contracts.Votacion.methods.numero_candidatos().call().then(value => {
      console.log(value);
      for (var i = 1; i <= value; i++) {
        drizzle.contracts.Votacion.methods.candidatos(i).call().then(candidato => {
          c = new Object();
          c = {
            id: candidato.id,
            nombre: candidato.nombre,
            info: candidato.info,
            votos: parseInt(candidato.cantidad_votos),
          }
          console.log(c);
          setPostulados(oldArray => [...oldArray, c]);
          setState(prevState => ({
            columns: [{ title: 'Id', field: 'id' },
            { title: 'Nombre', field: 'nombre' },
            { title: 'Informacion', field: 'info' },
            { title: '# votos', field: 'votos' }],
            data: [...prevState.data, { id: c.id, nombre: c.nombre, info: c.info, votos: c.votos }]
          }));

        })
        c = new Object();
      }
      setNcandidatos(value);
    })
  }, []);
  if (postulados.length < ncandidatos) {
    console.log("null")
    return null
  }
  return (
    <div>
      {postulados.length == ncandidatos ? (
        <Paper className={classes.root}>
          <CssBaseline />
          <Container component="main" className={classes.main} maxWidth="sm">
            <Grid>
              <Chart
                data={postulados}
              >
                <ValueAxis max={20} />
                <ArgumentAxis
                />
                <BarSeries
                  valueField="votos"
                  argumentField="nombre"
                  color="#381BB7"
                />
                <Title text="Resultados Votacion" />
                <Animation />
              </Chart>
            </Grid>
            <Grid>
              <MaterialTable
                title="datos"
                columns={state.columns}
                data={state.data}
                options={{
                  exportButton: true
                }}
                localization={{
                  pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect:'Filas',
                    previousAriaLabel:'Pagina anterior',
                    nextAriaLabel:'pagina siguiente',
                    previousTooltip:'Pagina Anterior',
                    nextTooltip:'Pagina siguiente',
                    lastTooltip:'Ultima pagina'
                  },
                  toolbar:{
                    exportTitle:'Exportar',
                    exportAriaLabel:'Exportar',
                    exportName:'Exportar como Excel',
                    searchPlaceholder:'Buscar'
                  }
                }}
              >
              </MaterialTable>
            </Grid>
            <br></br>
            <Button variant="contained" color="primary" component={Link} to="/">
              Volver al inicio
            </Button>
          </Container>
          <footer className={classes.footer}>
            <Container maxWidth="sm" className={classes.fooColor}>
              <Copyright />
            </Container>
          </footer>
        </Paper>
      ) : (
          <div>cargando resultados</div>
        )}
    </div>
  );
}