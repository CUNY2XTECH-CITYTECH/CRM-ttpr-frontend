import { BaseClient } from "./server";

export class AdminClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchOne() {
    const res = await this.get('adminProfile/me');
    return res
  }

  async create() {
    // get all user

    const res = await this.post('adminProfile/create');
    return res;
  }

  async update() {
    // get all user

    const res = await this.post('adminProfile/update');
    return res
  }

  async delete() {
    // get all user

    const res = await this.post('adminProfile/delete');
    return res
  }
}


