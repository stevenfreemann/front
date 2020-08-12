import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VistaVto from "./vistaVto";
import Login from "./login"; 


class App extends Component {
  state = { loading: true, drizzleState: null, accounts:[] };

  componentDidMount() {
    const { accounts} = this.props;
    const { drizzle } = this.props;
    console.log(accounts);
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
   /*   <VistaVto
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}/>*/
      if (this.state.loading) return "Loading Drizzle...";
        return (
         <div className="App">
           <VistaVto
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}/>
          </div>
          
        );
    }
}

export default App;