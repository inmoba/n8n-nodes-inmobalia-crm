import type { HttpClient } from './client';
import type { IDataObject } from 'n8n-workflow';

interface PaginateAllParams {
  client: HttpClient;
  path: string;
  qs?: IDataObject;
  unwrap?: string; // e.g., 'content'
  returnAll: boolean;
  limit?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function paginateAll<T = unknown>(params: PaginateAllParams): Promise<T[]> {
  const { client, path, unwrap, returnAll } = params;
  const { qs, limit } = params;

  const pageSize = Math.min(200, Number(qs?.size ?? 100));
  let page = Number(qs?.page ?? 0);
  const results: T[] = [];

  const buildQs = () => ({
    ...(qs ?? {}),
    page,
    size: pageSize,
  });

  if (!returnAll) {
    const target = Math.max(1, Number(limit ?? 50));
    while (results.length < target) {
      const res = await client.get<unknown>(path, buildQs());
      let chunk: T[] = [];
      if (unwrap && isRecord(res)) {
        const r = res as Record<string, unknown>;
        if (Array.isArray(r[unwrap])) {
          chunk = r[unwrap] as T[];
        }
      }
      if (chunk.length === 0) {
        if (Array.isArray(res)) {
          chunk = res as T[];
        } else if (isRecord(res)) {
          const r = res as Record<string, unknown>;
          if (Array.isArray(r.items)) {
            chunk = r.items as T[];
          }
        }
      }
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
    const res = await client.get<unknown>(path, buildQs());
    let chunk: T[] = [];
    if (unwrap && isRecord(res)) {
      const r = res as Record<string, unknown>;
      if (Array.isArray(r[unwrap])) {
        chunk = r[unwrap] as T[];
      }
    }
    if (chunk.length === 0) {
      if (Array.isArray(res)) {
        chunk = res as T[];
      } else if (isRecord(res)) {
        const r = res as Record<string, unknown>;
        if (Array.isArray(r.items)) {
          chunk = r.items as T[];
        }
      }
    }
    if (!chunk?.length) break;
    results.push(...chunk);
    if (chunk.length < pageSize) break;
    page += 1;
    pages += 1;
  }

  return results;
}
