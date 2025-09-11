import type { HttpClient } from './client';
import type { IDataObject } from 'n8n-workflow';

interface PaginateAllParams<T> {
  client: HttpClient;
  path: string;
  qs?: IDataObject;
  unwrap?: string; // e.g., 'content'
  returnAll: boolean;
  limit?: number;
}

export async function paginateAll<T = unknown>(params: PaginateAllParams<T>): Promise<T[]> {
  const { client, path, unwrap, returnAll } = params;
  let { qs, limit } = params;

  const pageSize = Math.min(200, Number((qs?.size as number) ?? 100));
  let page = Number((qs?.page as number) ?? 0);
  const results: T[] = [];

  const buildQs = () => ({
    ...(qs ?? {}),
    page,
    size: pageSize,
  });

  if (!returnAll) {
    const target = Math.max(1, Number(limit ?? 50));
    while (results.length < target) {
      const res = await client.get<any>(path, buildQs());
      const chunk: T[] = unwrap && res?.[unwrap] ? (res[unwrap] as T[]) : (Array.isArray(res) ? res : res?.items ?? []);
      if (!chunk?.length) break;
      for (const row of chunk) {
        results.push(row);
        if (results.length >= target) break;
      }
      if (chunk.length < pageSize) break;
      page += 1;
    }
    return results;
  }

  // returnAll = true
  // Keep fetching until no more content
  // Guard a hard upper bound of pages to avoid infinite loops
  const maxPages = 500;
  let pages = 0;
  while (pages < maxPages) {
    const res = await client.get<any>(path, buildQs());
    const chunk: T[] = unwrap && res?.[unwrap] ? (res[unwrap] as T[]) : (Array.isArray(res) ? res : res?.items ?? []);
    if (!chunk?.length) break;
    results.push(...chunk);
    if (chunk.length < pageSize) break;
    page += 1;
    pages += 1;
  }

  return results;
}
