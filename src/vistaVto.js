import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class vistaVto extends React.Component {
state = { dataKey: null, postulados:[],ok:false,fail:false,carga:false,redirect:null};
  componentDidMount() {
    const { drizzle, drizzleState  } = this.props;
    
      var c={};
      drizzle.contracts.Votacion.methods.numero_candidatos().call().then(value=>{
        for(var i=1 ; i<=value;i++){            
          drizzle.contracts.Votacion.methods.candidatos(i).call().then(candidato=>{
            c = new Object();
             c ={
              id :candidato.id,
              nombre: candidato.nombre,
              votos: candidato.cantidad_votos,
              url: require('/'+candidato.url),
              info: candidato.info
            }
            this.setState(prevState => ({
              postulados: [...prevState.postulados, c]
            }))           
          })           
          c = new Object();
         }              
       })  
       console.log(drizzleState.accounts[1])
  } 
  render() {
    return (
      <div>
        {this.state.redirect}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.carga}
        message="Note archived"
        action={
          <React.Fragment>
            <CircularProgress color="inherit" />
          </React.Fragment>
        }
      />
      <Snackbar open={this.state.ok} autoHideDuration={6000}>
        <Alert severity="success">
          Voto realizado correctamente!
        </Alert>
      </Snackbar>
      <Snackbar open={this.state.fail} autoHideDuration={6000}>
        <Alert severity="error">
          Token no valido!
        </Alert>
      </Snackbar>         
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
        <br/><br/>
      <Container maxWidth="xl" color="primary">
         
        <Grid container spacing={1}>
        
          {this.state.postulados.map((card) => (
            <Grid item key={card} xs={7} sm={5} md={4}>
              <Card>
               <img src={card.url} width="300" height="220"/>  
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      {card.nombre}
                    </Typography>
                  <Typography>
                    {card.info}
                    </Typography>
                </CardContent>
                <Grid>
                <CardActions>
                  <Button 
                  type="submit"
                  onClick={() => { this.votar(card.id) }} 
                  endIcon={<SendIcon></SendIcon>}>
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
  votar(id){
    this.setState({carga:true})
    var token = this.props.match.params.token;
    const { drizzle, drizzleState } = this.props;
    console.log(drizzleState);
    drizzle.contracts.Votacion.methods.votar(id,token).send({from:drizzleState.accounts[1]})
    .then(promise=>{
      console.log("promesa: "+ promise);
      this.setState({carga:false,ok:true})
    }).catch(error=>{
      console.log("el error es: "+error);
      this.setState({carga:false,fail:true})
    });
    
  }
}


export default vistaVto;

  