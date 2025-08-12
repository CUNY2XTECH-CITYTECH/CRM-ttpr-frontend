import { BaseClient } from "./server";

export class AuthServiceClient extends BaseClient {
  async login(data, optionalHeader) {
    // get all user
    const res = await this.post('login', data, optionalHeader);
    return res
  }
  async refresh(data) {
    const res = await this.post('refresh', data, { credentials: 'include' });
    return res

  }
}




