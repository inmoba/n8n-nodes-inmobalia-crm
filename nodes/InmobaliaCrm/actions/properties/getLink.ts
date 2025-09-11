import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getPropertyLink(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const propertyId = this.getNodeParameter('propertyId', itemIndex) as number;
  const linkId = this.getNodeParameter('linkId', itemIndex) as number;
  const res = await client.get<IDataObject>(`/properties/${propertyId}/links/${linkId}`);
  return res;
}

