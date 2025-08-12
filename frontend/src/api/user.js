import { BaseClient } from "./server";

export class UserClient extends BaseClient {
  constructor(token){
   super(token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('users');
    console.log(res)
    if(res.ok){
    return res.json();
    }
    else{
       return res.error
    }

  }

  async create() {
    // get all user

    const res = await this.post('users/create');
    return res.json();
  }

  async update() {
    // get all user

    const res = await this.post('users/update');
    return res.json();
  }

  async delete() {
    // get all user

    const res = await this.post('users/delete');
    return res.json();
  }
}



