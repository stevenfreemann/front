import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';

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
const useStyle = makeStyles({
    styleButton:{
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }
  })
const VistaVTO = props=> {
    const [postulados, setPostulados] = useState([]);
    const { drizzle } = props;
    const contract = drizzle.contracts.Votacion;  
      var c={};
      var array=[];
      drizzle.contracts.Votacion.methods.numero_candidatos().call().then(value=>{
        for(var i=1 ; i<=value;i++){            
          drizzle.contracts.Votacion.methods.candidatos(1).call().then(candidato=>{
            c = new Object();
             c ={
              id :candidato.id,
              nombre: candidato.nombre,
              votos: candidato.cantidad_votos,
              url: candidato.url,
              info: candidato.info
            }
            array.push(c);
         /*   setPostulados((prevState) => ({
                ...prevState,
                c,
              }));       */    
          })           
          c = new Object();
         }              
       })
       console.log(array[0])
       return(
           <div>
               hola
           </div>
       )
}
export default VistaVTO;