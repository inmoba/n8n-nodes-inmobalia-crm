import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';

export async function getBooking(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const bookingId = this.getNodeParameter('bookingId', itemIndex) as number;
  const res = await client.get<IDataObject>(`/bookings/${bookingId}`);
  return res;
}

