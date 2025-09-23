import {BaseClient} from './server';
export class AppointmentClient extends BaseClient {
  constructor(token) {
    super(undefined, token);
  }
  async fetchAll(optionalHeader) {
    // get all user
    const res = await this.get('appointment', optionalHeader);
    return res;
  }
  async fetchByQuery(query, value, optionalHeader) {
    // get all user
    const res = await this.get(`appointment?${query}=${value}`, optionalHeader);
    return res;
  }
  async fetchOne(id, optionalHeader) {
    const res = await this.get('appointment/detail/' + id, optionalHeader);
    return res;
  }
  async create(data, optionalHeader) {
    const res = await this.post('appointment/create', data, optionalHeader);
    return res;
  }
  async update(data, optionalHeader) {
    const res = await this.patch('appointment/update', data, optionalHeader);
    return res;
  }
  async deleteOne(id, optionalHeader) {
    const res = await this.delete('appointment/delete/' + id, optionalHeader);
    return res;
  }
}

