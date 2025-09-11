import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function listPropertyCategories(this: IExecuteFunctions, client: HttpClient) {
  const res = await client.get<IDataObject[]>(`/properties/categories`);
  return res;
}

