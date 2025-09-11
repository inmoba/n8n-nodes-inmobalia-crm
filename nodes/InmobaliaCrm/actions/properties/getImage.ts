import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getPropertyImage(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const propertyId = this.getNodeParameter('propertyId', itemIndex) as number;
  const imageId = this.getNodeParameter('imageId', itemIndex) as number;
  const res = await client.get<IDataObject>(`/properties/${propertyId}/images/${imageId}`);
  return res;
}

