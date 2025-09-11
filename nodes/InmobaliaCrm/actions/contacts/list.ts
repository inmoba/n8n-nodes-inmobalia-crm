import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';
import { paginateAll } from '../../transport/pagination';
import { normalizeDateParams } from '../../utils/dates';

export async function listContacts(this: IExecuteFunctions, client: HttpClient, itemIndex = 0): Promise<IDataObject[]> {
	const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false);
	const limit: number = this.getNodeParameter('limit', itemIndex, 50);
	const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {});

	// Normalize sort: if provided as comma-separated string turn into array
	const sort = filters.sort as string | string[] | undefined;
	if (typeof sort === 'string' && sort.trim() !== '') {
		const items = sort.includes('|')
			? sort.split('|').map((s) => s.trim()).filter(Boolean)
			: [sort.trim()];
    filters.sort = items;
  }

  // Normalize dates per OpenAPI (all date-time)
  const normalized = normalizeDateParams(filters, {
    dateTimeKeys: ['fromDateCreated', 'toDateCreated', 'fromDateModified', 'toDateModified'],
  });

  const rows = await paginateAll<IDataObject>({
		client,
		path: '/contacts',
		qs: normalized,
		unwrap: 'content',
		returnAll,
		limit,
	});

	return rows;
}
