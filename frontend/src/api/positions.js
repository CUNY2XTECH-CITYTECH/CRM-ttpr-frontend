import {BaseClient} from './server'
export class PositionClient extends BaseClient {
  constructor(token) {
    super(undefined, token)
  }
  async fetchAll() {
    // get all user
    const res = await this.get('position')
    return res
  }
  async fetchOne(id) {
    const res = await this.get('position/' + id)
    return res
  }

  async create(data) {
    // get all user

    const res = await this.post('position/create', data)
    return res
  }

  async update() {
    // get all user

    const res = await this.post('position/update')
    return res
  }

  async delete() {
    // get all user
    const res = await this.post('position/delete')
    return res
  }
}
