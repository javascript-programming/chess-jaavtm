import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

declare global {
  interface Window { WebClient: any; }
}

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  private client: any;
  private address: String; // contract address set in environment
  private contract: any;
  private connected = false;

  constructor() {
    this.client = new window.WebClient(environment.tendermintHost);
    this.address = environment.contract;
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
          this.client.createNamedAccount(password, name).then(resolve).catch(reject);
        }).catch(reject);
      });
  }

  getAccount(name , password) {
      return new Promise((resolve, reject) => {
        this.connect().then(() => {
          this.client.getAccount(name, password).then(resolve).catch(reject);
        }).catch(reject);
      });
  }

  getContract(account) {
    if (this.contract) {
      this.client.unregisterContract(this.contract);
    }

    return new Promise((resolve, reject) => {
      this.client.getContract(this.address, account).then(contract => {
        this.contract = contract;
        resolve(contract);
      }).catch(e => reject(e));
    });
  }
}
