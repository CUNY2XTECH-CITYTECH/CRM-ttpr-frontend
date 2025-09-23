import { BaseClient } from "./server";
export class DepartmentClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('department');
    return res
  }
  async fetchOne(id) {
    const res = await this.get('department/'+id);
      return res

  }

  async create(data) {
    // get all user

    const res = await this.post('department/create',data); 
    return res;
  }

  async update() {
    // get all user

    const res = await this.post('department/update');
    return res
  }

  async delete() {
    // get all user
    const res = await this.post('department/delete');
    return res  }
}

