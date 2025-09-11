import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';
import { paginateAll } from '../../transport/pagination';
import { normalizeDateParams } from '../../utils/dates';

export async function listBookings(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false);
  const limit: number = this.getNodeParameter('limit', itemIndex, 50);
  const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {});

  // Sort: allow only a single field as provided; no normalization

  // Normalize dates per OpenAPI (mix of date and date-time)
  const normalized = normalizeDateParams(filters, {
    dateKeys: ['fromDateStart', 'toDateStart', 'fromDateEnd', 'toDateEnd'],
    dateTimeKeys: ['fromDateCreated', 'toDateCreated', 'fromDateModified', 'toDateModified'],
  });

  const rows = await paginateAll<IDataObject>({
    client,
    path: '/bookings',
    qs: normalized,
    unwrap: 'content',
    returnAll,
    limit,
  });

  return rows;
}
