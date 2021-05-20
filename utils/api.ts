import axios, { AxiosResponse } from 'axios';

export default async function api<T = any>(
  path: string
): Promise<AxiosResponse<T>> {
  return axios.get<T>("http://localhost:3000" + path);
}