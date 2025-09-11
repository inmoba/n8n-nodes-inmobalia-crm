import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getBookingByCode(
  this: IExecuteFunctions,
  client: HttpClient,
  itemIndex = 0,
) {
  const code = this.getNodeParameter('code', itemIndex) as number;
  const res = await client.get<IDataObject>(`/bookings/by-code/${code}`);
  return res;
}

