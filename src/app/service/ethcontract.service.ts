import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

let tokenABI = require('../../../build/contracts/Payment.json');

@Injectable({
  providedIn: 'root'
})
export class EthcontractService {

  private web3Provider: null;
  private constract: {};

  constructor() {
    // Initialize web3 and set the provider to testRPC
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      // Set Provider you want form Web3.provider;
      this.web3Provider = new Web3.provider.HttpProviders('http:localhost/7545');
    }
    window.web3 = new Web3(this.web3Provider);
   }

   // Get information of a Accout
   getAccoutInfo() {
     return new Promise((resolve, reject) => {
       window.web3.eth.getCoinBase(function(err, account) {
        if (err === null) {
          return resolve({fromAccount: account, balance: Web3.utils.fromWei( 'ether')});
        } else {
          return reject(console.log('error'));
        }
       });
     });
   }
   // Tranfer Ether
   transferEther(
     _transferFrom,
     _transferTo,
     _amount,
     _remarks
   )  {
    return new Promise((resolve, reject) => {
      // Deployed contract
      const paymentContract = TruffleContract(tokenABI);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
        return instance.transferFund( _transferTo,
          {
            from: _transferFrom,
            value: Web3.toWei(_amount, 'ether')
          });
      }).then(function(status) {
        if (status) {
          return resolve({status: true});
        }
      }).catch(function(err){
        return reject(console.log(err));
      });
    });
   }
}
