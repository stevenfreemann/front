import React, { Component } from 'react';
import './App.css';
import VistaVto from "./vistaVto";
import Login from "./login";
import Home from "./Home";
import Loginadm from "./admin/Loginadmin";
import Dashboard from "./admin/Dashboard";
import CountDown from "./countDown";
import Resultados from "./resultados";
import { home, login, vistavto, logAdmin, dashboard, countDown, resultados }from "./config/routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  state = { loading: true, drizzleState: null, accounts: [] };

  componentDidMount() {
    const { drizzle } = this.props;

    // Suscribe cambios a la store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // actualiza el estado de la tienda
      const drizzleState = drizzle.store.getState();

      // Verifica Que drizzle este inicializado
      if (drizzleState.drizzleStatus.initialized) {

        this.setState({ loading: false, drizzleState });

      }
    });

  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    
    if (this.state.loading) return "Cargando estado blockchain";
    
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route path={home()} exact>
            <Home></Home>
          </Route>
          <Route path={countDown()} exact>
            <CountDown></CountDown>
          </Route>
          <Route path={login()} >
            <Login
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState} />
          </Route>
          <Route exact path={vistavto()} 
            render={ props=>
          <VistaVto {...props}
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>}> 
          </Route>
          <Route exact path={logAdmin()}
            render={ props=>
          <Loginadm {...props}
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>}> 
          </Route>
          <Route exact path={resultados()}
            render={ props=>
          <Resultados {...props}
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>}> 
          </Route>
          <Route exact path={dashboard()+"/:pass"} 
            render={ props=> 
            <Dashboard {...props}
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>}>   
          </Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;