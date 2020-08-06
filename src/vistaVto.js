import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';

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

class vistaVto extends React.Component {
state = { dataKey: null, postulados:[]};
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Votacion;  
      var c={};
      drizzle.contracts.Votacion.methods.numero_candidatos().call().then(value=>{
        for(var i=1 ; i<=value;i++){            
          drizzle.contracts.Votacion.methods.candidatos(i).call().then(candidato=>{
            c = new Object();
             c ={
              id :candidato.id,
              nombre: candidato.nombre,
              votos: candidato.cantidad_votos,
              url: candidato.url,
              info: candidato.info
            }
            this.setState(prevState => ({
              postulados: [...prevState.postulados, c]
            }))           
          })           
          c = new Object();
         }              
       })  
  } 
  render() {
  
    return (
      <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Grid padding={3}>
            <HowToVoteIcon/>
          </Grid>
          <hr></hr>
          <Grid padding={3}>
          <Typography spacing={2} variant="h6" color="inherit" noWrap>
            E-VOTING
          </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>
      <Container maxWidth="xl">       
        <Grid container spacing={1} flexGrow={1}>
          {this.state.postulados.map((card) => (
            <Grid item key={card} xs={7} sm={5} md={4}>
              <Card>
               <img src={require('./'+card.url)} width="300" height="220"/>  
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      {card.nombre}
                    </Typography>
                  <Typography>
                    {card.info}
                    </Typography>
                </CardContent>
                <Grid justify="center" alignItems="center">
                <CardActions>
                  <Button onClick={() => { alert('clicked') }} endIcon={<SendIcon></SendIcon>}>
                    Votar
                  </Button>
                </CardActions>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>
      </div>
    </div>
    );
  }
}


export default vistaVto;

  