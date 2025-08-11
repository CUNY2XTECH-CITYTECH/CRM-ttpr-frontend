import { HTTPClientError, BaseClient } from "./server";

export async function createData(endpoint, data,option) {
  let client = new BaseClient()
  return client.post(endpoint, data,option)
}
export async function getData(endpoint, data,option) {
  let client = new BaseClient()
  return client.get(endpoint, data,option)
}
export async function updateData(endpoint, data,option) {
  let client = new BaseClient()
  return client.put(endpoint, data,option)
}
export async function deleteData(endpoint, data,option) {
  let client = new BaseClient()
  return client.delete(endpoint, data,option)
}
