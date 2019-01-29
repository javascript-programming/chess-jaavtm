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
  private address: String;
  private contract: any;

  constructor() {
    this.client = new window.WebClient(environment.tendermintHost);
    this.address = environment.contract;
  }

  async getAccount (name) {
    return await this.client.getAccount(name);
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
