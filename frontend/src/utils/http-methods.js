import { HTTPClientError, BaseClient } from "./server";

export async function createData(endpoint, data) {
  let client = new BaseClient()
  return client.post(endpoint, data)
}
export async function getData(endpoint, data) {
  let client = new BaseClient()
  return client.get(endpoint, data)
}
export async function updateData(endpoint, data) {
  let client = new BaseClient()
  return client.put(endpoint, data)
}
export async function deleteData(endpoint, data) {
  let client = new BaseClient()
  return client.delete(endpoint, data)
}
