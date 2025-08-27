import { BaseClient } from "./server";

export class StateCityClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchCities() {
    // get all cities 
    const res = await this.get('cities');
    return res
  }
  async fetchCitiesByState(state) {
    // get cities by state 
    const res = await this.get('cities/'+state);
    return res
  }

  async fetchStates() {
    // get all states 
    const res = await this.get('states');
    return res
  }
}


