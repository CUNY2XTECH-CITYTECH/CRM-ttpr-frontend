import { AdminClient } from "./admin";
import { AuthServiceClient } from "./auth";
import { CompaniesClient } from "./companies";
import { DepartmentClient } from "./departments";
import { IndustryClient } from "./industries";
import { StateCityClient } from "./stateCity";
import { UserClient } from "./user";

export class Client {
  constructor(token) {
    this.token = token;
    this.user = new UserClient(this.token);
    this.auth = new AuthServiceClient()
    this.companies = new CompaniesClient(this.token)
    this.adminProfile = new AdminClient(this.token)
    this.industries = new IndustryClient(this.token)
    this.stateCities = new StateCityClient(this.token)
    this.departments = new DepartmentClient(this.token)
  }
  user() {
    return this.user;
  }
  departments() {
    return this.departments;
  }
  industries() {
    return this.industry;
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

