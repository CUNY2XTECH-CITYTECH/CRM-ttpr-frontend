import { AuthServiceClient } from "./auth";
import { UserClient } from "./user";

export class Client {
  constructor(token) {
    this.token = token;
    this.user = new UserClient(this.token);
    this.auth = new AuthServiceClient()
  }
  user() {
    return this.user;
  }
  auth() {
    return this.auth;
  }

  setToken(token) {
    this.token = token
  }
  getToken() {
    return this.token;
  }
}

