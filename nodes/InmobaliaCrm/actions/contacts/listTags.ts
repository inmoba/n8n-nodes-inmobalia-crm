import type { IExecuteFunctions } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function listContactTags(this: IExecuteFunctions, client: HttpClient) {
  const res = await client.get<string[]>(`/contacts/tags`);
  return res;
}
