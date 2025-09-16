import { BaseClient } from "./server";
export class TechStacksClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }

  async fetchTechStacks() {
    // get all tech stacks 
    const res = await this.get('techstacks');
    return res
  }

  async fetchTechStacks(id) {
    // get a specific tech stack by id
    const res = await this.get(`techstacks/${id}`);
    return res
  }

  async createTechStacks(data) {
    // create a new tech stack
    const res = await this.post('techstacks', data);
    return res
  }

  async updateTechStacks(id, data) {
    // update a specific tech stack by id
    const res = await this.put(`techstacks/${id}`, data);
    return res
  }

  async deleteTechStacks(id) {
    // delete a specific tech stack by id
    const res = await this.delete(`techstacks/${id}`);
    return res
  }     
}