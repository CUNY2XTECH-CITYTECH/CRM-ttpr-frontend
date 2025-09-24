import {BaseClient} from './server.js';
export class StudentClient extends BaseClient {
  constructor(token) {
    super(undefined, token);
  }
  async fetchAll() {
    const res = await this.get('studentProfile');
    return res;
  }
  async fetchOne() {
    const res = await this.get('studentProfile/me');
    return res;
  }

  async create(data) {
    const res = await this.post('studentProfile/create', data); 
    return res;
  }

  async update(data) {
    const res = await this.post('studentProfile/update', data); 
    return res;
  }

  async delete() {
    const res = await this.post('studentProfile/delete');
    return res;
  }
}
