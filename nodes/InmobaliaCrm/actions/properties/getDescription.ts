import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getPropertyDescription(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const propertyId = this.getNodeParameter('propertyId', itemIndex) as number;
  const language = this.getNodeParameter('language', itemIndex) as string;
  const res = await client.get<IDataObject>(`/properties/${propertyId}/descriptions/${encodeURIComponent(language)}`);
  return res;
}

