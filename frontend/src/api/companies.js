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
  async fetchOne(id) {
    const res = await this.get('company/'+id);
      return res

  }

  async create(data,optionalHeader) {
    // get all user

    const res = await this.post('company/create',data,optionalHeader);
    return res;
  }

  async update(data,optionalHeader) {
    // get all user

    const res = await this.patch('company/update',data,optionalHeader);
    return res
  }

  async delete(id,optionalHeader) {
    // get all user

    const res = await this.delete('company/delete/'+id,optionalHeader);
    return res  }
}


