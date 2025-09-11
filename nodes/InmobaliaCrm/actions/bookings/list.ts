import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';
import { paginateAll } from '../../transport/pagination';

export async function listBookings(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false);
  const limit: number = this.getNodeParameter('limit', itemIndex, 50);
  const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {});

  // Normalize sort input (string with | separator -> array)
  const sort = filters.sort as string | string[] | undefined;
  if (typeof sort === 'string' && sort.trim() !== '') {
    const items = sort.includes('|')
      ? sort
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      : [sort.trim()];
    filters['sort'] = items;
  }

  // Ensure date-only values are passed as date part if user provided dateTime
  const dateOnlyKeys = ['fromDateStart', 'toDateStart', 'fromDateEnd', 'toDateEnd'] as const;
  for (const key of dateOnlyKeys) {
    const val = filters[key] as string | undefined;
    if (typeof val === 'string' && val) {
      // Extract YYYY-MM-DD
      const datePart = val.split('T')[0];
      filters[key] = datePart;
    }
  }

  const rows = await paginateAll<IDataObject>({
    client,
    path: '/bookings',
    qs: filters,
    unwrap: 'content',
    returnAll,
    limit,
  });

  return rows;
}
