import { BaseClient } from "./server";

export class AuthServiceClient extends BaseClient {
  async login(data, optionalHeader) {
    // get all user
    const res = await this.post('auth/login', data, optionalHeader);
    return res
  }
  async logout(optionalHeader) {
    // get all user
    const res = await this.get('auth/logout',optionalHeader);
    return res
  }
  async refresh(data,optionalHeader) {
    const res = await this.post('refresh', data,optionalHeader);
    return res

  }
}




