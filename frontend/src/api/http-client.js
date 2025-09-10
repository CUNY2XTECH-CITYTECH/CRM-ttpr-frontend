import { AdminClient } from "./admin";
import { AuthServiceClient } from "./auth";
import { CompaniesClient } from "./companies";
import { IndustryClient } from "./industry";
import { StateCityClient } from "./stateCity";
import { UserClient } from "./user";
import { DepartmentClient } from "./department";


export class Client {
  constructor(token) {
    this.token = token;
    this.user = new UserClient(this.token);
    this.auth = new AuthServiceClient()
    this.companies = new CompaniesClient(this.token)
    this.adminProfile = new AdminClient(this.token)
    this.industry = new IndustryClient(this.token)
    this.stateCities = new StateCityClient(this.token)
    this.department = new DepartmentClient(this.token)
    //add department client here
  }
  user() {
    return this.user;
  }
  industry() {
    return this.industry;
  }
  department() {
    return this.department;
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

