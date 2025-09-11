import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getPropertyCategory(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const categoryId = this.getNodeParameter('categoryId', itemIndex) as number;
  const res = await client.get<IDataObject>(`/properties/categories/${categoryId}`);
  return res;
}

