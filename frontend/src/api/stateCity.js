import { BaseClient } from "./server";

export class StateCityClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchCities() {
    // get all user
    const res = await this.get('cities');
    return res
  }

  async fetchStates() {
    // get all user
    const res = await this.get('states');
    return res
  }
}


