import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Drizzle } from "@drizzle/store";
import Votacion from "./contracts/Votacion.json";

const options = {
  contracts: [Votacion],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};

const drizzle = new Drizzle(options);
const drizzleState = drizzle.store.getState();
console.log(drizzle)
ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));