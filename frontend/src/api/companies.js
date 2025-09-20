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
    const res = await this.get('company/detail/' + id);
    return res

  }
  async fetchMatrix(){
    const res = await this.get('company/getMatrix');
      return res
  }
  async create(data, optionalHeader) {
    // get all user

    const res = await this.post('company/create', data, optionalHeader);
    return res;
  }
  async createMany(data, optionalHeader) {
    console.log(data, 'data in create many')
    const res = await this.post('company/createMany', data, optionalHeader);
    return res;
  }

  async update(data, optionalHeader) {
    // get all user

    const res = await this.patch('company/update', data, optionalHeader);
    return res
  }

  async deleteOne(id, optionalHeader) {
    // get all user
    console.log(id,'id to delete in client')
    const res = await this.delete('company/delete/' + id, optionalHeader);
    return res
    //
  }
}


