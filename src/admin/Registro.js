import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(5),
        maxWidth: '200px',
        maxHeight: '50px',
        minWidth: '200px',
        minHeight: '50px'
    },
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(0.1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    input: {
        display: 'none',
    },
}));

export default function CenteredGrid(props) {
    const classes = useStyles();
    const [nombres, setNombres] = React.useState("");
    const [apellidos, setApellidos] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [nameFile, setNameFile] = React.useState("");
    const [estadoAlmacenar, setEstadoAlmacenar] = React.useState(
    <Button variant="contained" color="primary" disabled onClick={agregarCandidatos}>
        Almacenar
    </Button>)
    const [state, setState] = React.useState({
        columns: [
            { title: 'Nombre', field: 'nombre' },
            { title: 'Apellido', field: 'apellido' },
            { title: 'Informacion', field: 'info' },
            { title: 'Imagen', field: 'imagen' }
        ],
        data: [
            {nombre:'voto',
            apellido:'en blanco',
            info:'voto en blanco obligatorio, si se elimina sera registrado igualmente'}
        ],
    });
    useEffect(()=>{
        if(nombres !== '' && apellidos !== '' && descripcion !== '' && nameFile !== ''){
            setEstadoAlmacenar(
                <Button variant="contained" color="primary" onClick={agregarCandidatos}>
                    Almacenar
                </Button>)
        }
    },[nombres,apellidos,descripcion,nameFile])
    const handleChange1 = e => {
        setNombres(e.target.value);
    }
    const handleChange2 = e => {
        setApellidos(e.target.value);
    }
    const handleChange3 = e => {
        setDescripcion(e.target.value);
    }
    const onFileChange = e => {
        e.preventDefault();
        setSelectedFile(e.target.files[0]);
        setNameFile(e.target.files[0].name);
    
    }
    function agregarCandidatos() {
        console.log(selectedFile);
        setState(prevState => ({
            columns: [{ title: 'Nombre', field: 'nombre' },
            { title: 'Apellido', field: 'apellido' },
            { title: 'Informacion', field: 'info' },
            { title: 'Imagen', field: 'imagen' }],
            data: [...prevState.data, { nombre: nombres, apellido: apellidos, info: descripcion, imagen: nameFile }]
        }));
        props.actualizar(nombres, apellidos, descripcion, nameFile, selectedFile);
        setNombres("");
        setApellidos("");
        setDescripcion("");
        setSelectedFile(null);
        setNameFile("");
        setEstadoAlmacenar(
            <Button variant="contained" color="primary" disabled onClick={agregarCandidatos}>
                Almacenar
            </Button>)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" gutterBottom>
                            Agregar Candidato
                            </Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Nombres" value={nombres} onChange={handleChange1} />
                        <TextField id="standard-basic" label="Apellidos" value={apellidos} onChange={handleChange2} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Descripcion"
                            multiline
                            rowsMax={8}
                            style={{ height: '20px' }}
                            value={descripcion}
                            onChange={handleChange3}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom>
                            Foto
                        </Typography>
                        <div>
                            <input
                                name="image"
                                className={classes.input}
                                id="file"
                                type="file"
                                onChange={onFileChange}
                                accept=".jpg"
                            />
                            <label htmlFor="file">
                                <Button  variant="contained" color="secondary" component="span">
                                    Upload
                            </Button>
                            </label>
                            <br />
                            {nameFile}
                            <br />
                            <br />
                            {estadoAlmacenar}
                        </div>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <MaterialTable
                            title="Candidatos"
                            columns={state.columns}
                            data={state.data}
                            editable={{
                                onRowDelete: (oldData) =>
                                    new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                            setState((prevState) => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return { ...prevState, data };
                                            });
                                        }, 600);
                                    }),
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
                                body:{
                                    editRow:{
                                        deleteText:'Esta seguro de eliminar esta fila?'
                                    }
                                },
                                toolbar:{
                                  searchPlaceholder:'Buscar'
                                }
                              }}
                        >
                        </MaterialTable>
                    </Grid>
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}