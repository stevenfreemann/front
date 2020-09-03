import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Drizzle, generateStore } from "@drizzle/store";
import Votacion from "./contracts/Votacion.json";
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const wallet = require('ethereumjs-wallet');
const Web3 = require('web3');
//var web3 = new Web3("http://192.168.174.129:8545");
/*
const mnemonic='snap' // mnemonic is the string containing the words
const seed = bip39.mnemonicToSeed(mnemonic);
const hdk = hdkey.fromMasterSeed(seed);
const hdwallet = hdkey.fromMasterSeed(seed);
const myWallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
console.log(myWallet)
console.log(`Address: ${myWallet.getAddressString()}`);
console.log(`Private Key: ${myWallet.getPrivateKeyString()}`);
/*const addr_node = hdk.derivePath("m/44'/60'/0'/0/0"); //m/44'/60'/0'/0/0 is derivation path for the first account. m/44'/60'/0'/0/1 is the derivation path for the second account and so on
const addr = addr_node.getWallet().getAddressString(); //check that this is the same with the address that ganache list for the first account to make sure the derivation is correct
const private_key = addr_node.getWallet().getPrivateKey();
console.log(addr)*/
//let accounts;
//  const accounts=web3.eth.getAccounts();
  //console.log(accounts);


// import drizzle functions and contract artifact


// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Votacion],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
};

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);


ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById('root'));