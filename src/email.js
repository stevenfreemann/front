import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
var generator = require('generate-password');
class email extends React.Component {

  state = { url: "http://localhost:3000/vote/", correo: "", correo2: "",alerta: null };
  constructor() {
    super();
    this.enviarEmail = this.enviarEmail.bind(this);
  }
  componentDidUpdate(prevProps,state) {
    var c1= this.props.correo
    var c2= this.props.correo2
    if (this.props.correo !== prevProps.correo) {
      this.setState({ correo: this.props })
    }
    if (this.props.correo2 !== prevProps.correo2) {
      this.setState({ correo2: this.props })
      if (c1.toLowerCase() !== c2.toLowerCase()) {
        this.setState({alerta:<Alert variant="filled" severity="error">No coincide con el correo ingresado Anteriormente</Alert>})
        
      } else {
        if (!c1.includes('@ucundinamarca.edu.co')) {
          this.setState({alerta:<Alert severity="warning">Correo Institucional no valido</Alert>})
          
        } else {
          this.setState({alerta:null})
        }
      }
    }
    
    console.log(c1+"-"+c2);
    
    
  }
  async enviarEmail(e) {
    e.preventDefault();
    var password = generator.generate({
      length: 20,
      numbers: true
    });

    const { correo, url } = this.state;
    var direccion = url + password;
    console.log(correo, direccion);
    const form = await axios.post("/api/form", {
      direccion,
      correo
    }).then(function (response) {
      console.log("OK")
      console.log(response);
    }).catch(x => {
      console.log("MURIO")
      console.log(x);
    });
  };
  render() {
    return (
    <Grid>
      {this.state.alerta}
      <Button
        onClick={this.enviarEmail}
        fullWidth
        variant="contained"
        color="primary"
      >
        Ingresar
      </Button>
      </Grid>
    );
  }

  /*   const validarEmailPass=()=>{
         if (!correoPass.includes('@ucundinamarca.edu.co')) {
           setAlerta(<Alert severity="warning">Correo Institucional no valido</Alert>)
         } else {
           console.log("email")
           var headers = {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': true
         }
           axios.post("http://localhost:3001/api/form",{
             generate,
             correo1
           },headers).then(response=>{
             console.log(response);
           }).catch(e=>{
             console.log(e);
           }); 
         
           setAlerta(null)    
         }
       }*/
}
export default email;