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
  async fetchIndustry(id) {
    const res = await this.get('industry/'+id);
      return res

  }

  async createIndustry(data) {
    // get all user

    const res = await this.post('industry/create',data);
    return res;
  }

  async updateIndustry() {
    // get all user

    const res = await this.post('industry/update');
    return res
  }

  async deleteIndustry() {
    // get all user

    const res = await this.post('industry/delete');
    return res  }
}

