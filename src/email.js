import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
var generator = require('generate-password');
class email extends React.Component {

  state = {
    url: "http://localhost:3000/vote/", correo: "", correo2: "", alerta: null,
    drizzle: null, drizzleState: null, ok: false, fail: false, carga: false,
    estadoButton: (<Button
      onClick={this.enviarEmail}
      fullWidth
      variant="contained"
      color="primary"
      disabled
    >
      Ingresar
    </Button>)
  };
  constructor(props) {
    super(props);
    console.log(props)
    this.enviarEmail = this.enviarEmail.bind(this);
  }
  componentDidMount() {
    this.setState({ drizzle: this.props.drizzle, drizzleState: this.props.drizzleState })

  }
  componentDidUpdate(prevProps,) {
    var c1 = this.props.correo
    var c2 = this.props.correo2
    if (this.props.correo !== prevProps.correo || this.props.correo2 !== prevProps.correo2) {
      this.setState({ correo: this.props })
      this.setState({ correo2: this.props })
      if (c1.toLowerCase() !== c2.toLowerCase()) {
        this.setState({ alerta: <Alert variant="filled" severity="error">No coincide con el correo ingresado Anteriormente</Alert>,estadoButton:(<Button
          onClick={this.enviarEmail}
          fullWidth
          variant="contained"
          color="primary"
          disabled
        >
          Ingresar
        </Button>) })

      } else {
        if (!c1.includes('@ucundinamarca.edu.co')) {
          this.setState({ alerta: <Alert severity="warning">Correo Institucional no valido</Alert>,estadoButton:(<Button
            onClick={this.enviarEmail}
            fullWidth
            variant="contained"
            color="primary"
            disabled
          >
            Ingresar
          </Button>) })

        } else {
          this.setState({ alerta: null,estadoButton:(<Button
            onClick={this.enviarEmail}
            fullWidth
            variant="contained"
            color="primary"
          >
            Ingresar
          </Button>) })
        }
      }
    }
    /*
    if (this.props.correo2 !== prevProps.correo2) {
      this.setState({ correo2: this.props })
    }
    */
  }
  async mailer(pass) {
    const { url } = this.state;
    const direccion = url + pass;
    const { correo } = this.props
    await axios.post("/api/form", {
      direccion,
      correo
    }).then(function (response) {
      console.log(response);
      return true;
    }).catch(error => {
      return false;
    });
  }
  async enviarEmail(e) {
    e.preventDefault();
    var password = generator.generate({
      length: 20,
      numbers: true
    });
    this.setState({ carga: true })
    const { correo, drizzle, drizzleState } = this.props
    console.log(drizzleState, drizzle);
    const solicitud = await drizzle.contracts.Votacion.methods.solicitudKey(correo, password).send({ from: drizzleState.accounts[1], gas: 3141592 })
      .then(promise => {
        console.log("promesa: " + promise);
        this.mailer(password);
        this.setState({ ok: true, carga: false })
      }).catch(error => {
        console.log("el error es: " + error);
        this.setState({ fail: true, carga: false })
      });
    console.log(solicitud)
  };
  render() {
    return (
      <Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.carga}
          message="Enviando Link de Acceso"
          action={
            <React.Fragment>
              <CircularProgress color="inherit" />
            </React.Fragment>
          }
        />
        <Snackbar open={this.state.ok} autoHideDuration={6000}>
          <Alert severity="success">
            Revise su Correo Institucional!
        </Alert>
        </Snackbar>
        <Snackbar open={this.state.fail} autoHideDuration={6000}>
          <Alert severity="error">
            Este correo ya fue usado!
        </Alert>
        </Snackbar>
        {this.state.alerta}
        {this.state.estadoButton}
      </Grid>
    );
  }
}
export default email;