import type { IDataObject } from 'n8n-workflow';

function isDateInstance(v: unknown): v is Date {
  return Object.prototype.toString.call(v) === '[object Date]';
}

function isNumeric(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

/**
 * Convert an input value into an ISO 8601 date-only string (YYYY-MM-DD).
 */
export function toIsoDate(value: string | number | Date): string {
  if (isDateInstance(value)) {
    return value.toISOString().slice(0, 10);
  }
  if (isNumeric(value)) {
    return new Date(value).toISOString().slice(0, 10);
  }
  if (isString(value)) {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    // If already looks like YYYY-MM-DD, keep the date part as-is
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    // If contains time, extract the date part from a valid Date
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
    return trimmed;
  }
  return String(value);
}

/**
 * Convert an input value into a full ISO 8601 date-time string.
 */
export function toIsoDateTime(value: string | number | Date): string {
  if (isDateInstance(value)) return value.toISOString();
  if (isNumeric(value)) return new Date(value).toISOString();
  if (isString(value)) {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    // If already looks like an ISO date-time, try to normalize via Date
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d.toISOString();
    return trimmed;
  }
  return String(value);
}

export interface NormalizeDateParamsSpec {
  dateKeys?: string[];      // keys that require date-only (YYYY-MM-DD)
  dateTimeKeys?: string[];  // keys that require full date-time
}

/**
 * Normalize date fields in a query/body object according to the OpenAPI formats.
 * - Removes empty string values
 * - Applies ISO 8601 formatting for date/date-time keys
 */
export function normalizeDateParams<T extends IDataObject>(obj: T, spec: NormalizeDateParamsSpec): T {
  const { dateKeys = [], dateTimeKeys = [] } = spec;
  const out: IDataObject = {};

  for (const [key, raw] of Object.entries(obj)) {
    if (raw === '' || raw === undefined || raw === null) {
      continue;
    }
    if (dateKeys.includes(key)) {
      out[key] = toIsoDate(raw as string | number | Date);
      continue;
    }
    if (dateTimeKeys.includes(key)) {
      out[key] = toIsoDateTime(raw as string | number | Date);
      continue;
    }
    out[key] = raw as unknown as string;
  }

  return out as T;
}
