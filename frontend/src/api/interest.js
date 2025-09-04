import { BaseClient } from "./server";
export class CompaniesClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('company');
    return res
  }
  async fetchOne() {
    const res = await this.get('company/:id');
      return res

  }

  async create() {
    // get all user

    const res = await this.post('company/create');
    return res;
  }

  async update() {
    // get all user

    const res = await this.post('company/update');
    return res
  }

  async delete() {
    // get all user

    const res = await this.post('company/delete');
    return res  }
}


