import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VistaVto from "./vistaVto";
import Login from "./login";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  state = { loading: true, drizzleState: null, accounts: [] };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {

        this.setState({ loading: false, drizzleState });

      }
    });


  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  constructor() {
    super();
  }


  render() {
    /*   */
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState} />
          </Route>
          <Route path="/vote">
            <VistaVto
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState} />
          </Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;