import { BaseClient } from "./server";
export class InterestsClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('interest');
    return res
  }
  async fetchOne() {
    const res = await this.get('interest/:id');
      return res

  }

  async create() {
    // get all user

    const res = await this.post('interest/create');
    return res;
  }


  async delete() {
    // get all user

    const res = await this.post('interest/delete');
    return res  }
}


