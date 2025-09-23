import { BaseClient } from "./server";
export class InternshipClient extends BaseClient {
  constructor(token) {
    super(undefined, token);
  }

  async createInternship(data) {
    return this.post("internship/create", data);
  }
  async fetchAll() {
    return this.get("internship");
  }

  async getInternship(id) {
    return this.get(`internship/${id}`);
  }

  async updateInternship(id, data) {
    return this.put(`internship/${id}`, data);
  }

  async deleteInternship(id) {
    return this.delete(`internship/${id}`);
  }
}


