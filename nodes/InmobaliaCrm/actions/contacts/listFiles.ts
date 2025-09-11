import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function listContactFiles(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const contactId = this.getNodeParameter('contactId', itemIndex) as number;
  const res = await client.get<IDataObject[]>(`/contacts/${contactId}/files`);
  return res;
}
