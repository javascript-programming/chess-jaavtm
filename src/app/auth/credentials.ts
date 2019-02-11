
export class Credentials {
  address: string = null;
  name: string;
  password: string;

  isVerified () {
    return this.address !== null;
  }
}
