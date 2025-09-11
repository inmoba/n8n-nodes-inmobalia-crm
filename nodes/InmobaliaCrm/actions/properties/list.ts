import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { HttpClient } from '../../transport/client';
import { paginateAll } from '../../transport/pagination';

export async function listProperties(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
  const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false);
  const limit: number = this.getNodeParameter('limit', itemIndex, 50);
  const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {});

  // Normalize sort
  const sort = filters.sort as string | string[] | undefined;
  if (typeof sort === 'string' && sort.trim() !== '') {
    const items = sort.includes('|')
      ? sort
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      : [sort.trim()];
    (filters as any).sort = items;
  }

  // Normalize statusPublish (array of strings)
  const statusPublish = filters.statusPublish as string | string[] | undefined;
  if (typeof statusPublish === 'string' && statusPublish.trim() !== '') {
    const items = statusPublish
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
    (filters as any).statusPublish = items;
  }

  const rows = await paginateAll<IDataObject>({
    client,
    path: '/properties',
    qs: filters,
    unwrap: 'content',
    returnAll,
    limit,
  });

  return rows;
}

