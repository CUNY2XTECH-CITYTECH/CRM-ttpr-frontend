import { UserClient } from "./user";

export class Client {
  constructor(token) {
    this.user = new UserClient(token);
  }

  user() {
    return this.user;
  }

  
}

