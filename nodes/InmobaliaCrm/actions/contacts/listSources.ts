import type { IExecuteFunctions } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function listContactSources(this: IExecuteFunctions, client: HttpClient) {
  const res = await client.get<any[]>(`/contacts/sources`);
  return res;
}

