import { BaseClient } from "./server";
export class IndustryClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('industry');
    return res
  }
  async fetchOne() {
    const res = await this.get('industry/:id');
      return res

  }

  async create(data) {
    // get all user

    const res = await this.post('industry/create');
    return res;
  }

  async update() {
    // get all user

    const res = await this.post('industry/update');
    return res
  }

  async delete() {
    // get all user

    const res = await this.post('industry/delete');
    return res  }
}

