import { AdminClient } from "./admin";
import { AuthServiceClient } from "./auth";
import { CompaniesClient } from "./companies";
import { UserClient } from "./user";

export class Client {
  constructor(token) {
    this.token = token;
    this.user = new UserClient(this.token);
    this.auth = new AuthServiceClient()
    this.companies = new CompaniesClient(this.token)
    this.adminProfile = new AdminClient(this.token)
  }
  user() {
    return this.user;
  }
  companies() {
    return this.companies
  }
  auth() {
    return this.auth;
  }
  admin() {
    return this.adminProfile;
  }
  setToken(token) {
    this.token = token
  }
  getToken() {
    return this.token;
  }
}

