import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { ChessGame } from '../../contracts/ChessGame';

declare global {
  interface Window { WebClient: any; }
}

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  private client: any;
  private address: string; // contract address set in environment
  private contract: any;
  private connected = false;

  constructor() {
    this.client = new window.WebClient(environment.tendermintHost);
    this.address = window.localStorage.getItem('address') || environment.contract;
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        this.client.connect().then(() => {
          this.connected = true;
          resolve();
        }).catch(reject);
      } else {
        resolve();
      }
    });
  }

  createAccount (name, password) {
      return new Promise((resolve, reject) => {
        this.connect().then(() => {
          this.client.createNamedAccount(password, name).then((result: any) => {
              this.getContract(result.address, password).then(() => {
                this.contract.registerPlayer(name, password).then(value => resolve(value.data)).catch(reject);
            }).catch(reject);
          }).catch(reject);
        }).catch(reject);
      });
  }

  getAccount(name , password) {
      return new Promise((resolve, reject) => {
        this.connect().then(() => {
          this.client.getAccount(name, password).then((result: any) => {
              this.getContract(result.account, password).then(() => {
                this.contract.getPlayer(result.account).then(player => {
                  resolve(player);
                }).catch(reject);
            }).catch(reject);
          }).catch(reject);
        }).catch(reject);
      });
  }

  getContract(account, password) {
    if (this.contract) {
      this.client.unregisterContract(this.contract);
    }

    return new Promise((resolve, reject) => {
      this.client.getContract(this.address, account).then(contract => {
        this.contract = contract;
        resolve(contract);
      }).catch(e => this.deployContract(account, password).then(resolve).catch(ee => reject(ee)));
    });
  }

  getConstractInstance () {
    return this.contract;
  }

  deployContract(account, password) {
    const me = this;

    window.localStorage.clear();

    return new Promise( (resolve, reject) => {

      this.client.upload(ChessGame).then(() => {
        this.client.deploy(account, password, 'ChessGame').then((result: any) => {
          me.address = result.address;
          window.localStorage.setItem('address', result.address);
          me.getContract(account, password).then(resolve).catch(reject);
        }).catch(reject);
      }).catch(reject);
    });
  }
}
