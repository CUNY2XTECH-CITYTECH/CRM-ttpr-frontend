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
  async fetchStudents(optionalHeader){ 
    const res = await this.get('users/getStudents',optionalHeader); 
      return res
  }
  async fetchRegisteredStaffs(optionalHeader){
   const res = await this.get('users/getRegisteredStaffs',optionalHeader);
    return res
  }
  async fetchPendingStaffs(query,optionalHeader){
    const withQuery=query?`?page=${query?.page}&pageSize=${query?.pageSize}`:''
    const res = await this.get('users/getPendingStaffs'+withQuery,optionalHeader);
     return res
   }
  async fetchVerifiedStaffs(optionalHeader){
    const res = await this.get('users/getVerifiedStaffs',optionalHeader);
     return res
   }
  async fetchMatrix(optionalHeader){
    const res = await this.get('users/getMatrix',optionalHeader);
      return res
  }
  async fetchByQuery(query,value) {
    // get all user
    const res = await this.get(`users?${query}=${value}`);
    return res
  }
  async fetchOne() {
    const res = await this.get('users/me');
      return res

  }
  async actionPendingStaff(id,action,optionalHeader){ 
    const res = await this.patch(`users/actionPendingStaff/${id}`,action,optionalHeader);
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

  async deleteOne(id,optionlHeader) {
    // get all user

    const res = await this.delete('users/delete',id,optionlHeader);
    return res  }
}



