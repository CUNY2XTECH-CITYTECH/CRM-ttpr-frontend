import { BaseClient } from "./server";

export class UserClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('users');
    return res
  }
  async fetchOne() {
    const res = await this.get('users/me');
      return res

  }

  async create(data) {
    // get all user

    const res = await this.post('users/create',data);
    return res;
  }

  async update() {
    // get all user

    const res = await this.post('users/update');
    return res
  }

  async delete() {
    // get all user

    const res = await this.post('users/delete');
    return res  }
}



