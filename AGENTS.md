# AGENTS.md — Guide to Build the Inmobalia CRM n8n Node

This document unambiguously specifies how to implement a custom n8n node that covers the Inmobalia CRM API operations using the OpenAPI specification included in `openapi-inmobalia.json`. OAuth2 authentication is already implemented in `credentials/InmobaliaCrmOAuth2Api.credentials.ts`.

Goal: deliver a single node package with a clean, layered architecture (UI descriptions, use-cases/actions, HTTP transport, utilities, and types) and follow TypeScript and n8n best practices.

---

## Repository Context

- OpenAPI specification: `openapi-inmobalia.json`
- OAuth2 credentials: `credentials/InmobaliaCrmOAuth2Api.credentials.ts`
  - Scopes already defined (activities, bookings, contacts, enquiries, events, properties, sales, users, web-leads)
  - `apiBaseUrl` = `https://api-crm.inmobalia.com/v1/`
- `package.json` is prepared to compile to `dist/` and copy icons.
- Node directory to implement: `nodes/InmobaliaCrm/`

---

## Architecture Principles

- Separation of concerns:
  - Descriptions/UI (n8n properties) isolated per resource and operation.
  - Actions (logic per operation) organized per resource, with no UI dependency.
  - Centralized HTTP transport (request, pagination, errors, rate limiting).
  - Shared utilities (mappings, query/body builders, validations).
  - Types generated from OpenAPI for strict typing.
- Single node: “Inmobalia CRM”, with “Resource” and “Operation” parameters.
- Initial coverage for priority resources and operations, extensible without breaking the node’s internal API.
- Consistent pagination and error handling. Outputs normalized to n8n’s `INodeExecutionData` format.

---

## Proposed Folder Structure

```
nodes/InmobaliaCrm/
  InmobaliaCrm.node.ts                 # Main node (metadata + execute)
  descriptions/                        # UI-only descriptions/properties per resource
    index.ts
    activities.resource.ts
    bookings.resource.ts
    contacts.resource.ts
    enquiries.resource.ts
    events.resource.ts
    properties.resource.ts
    sales.resource.ts
    users.resource.ts
    webLeads.resource.ts
  actions/                             # Operation implementations (logic)
    activities/
      list.ts
      get.ts
      create.ts
      update.ts
      remove.ts
    ... (same pattern per resource)
  transport/                           # HTTP layer and support
    client.ts          # request with auth, baseURL, headers
    pagination.ts      # pagination helpers (page/size)
    errors.ts          # NodeApiError normalization and wrappers
    rateLimit.ts       # backoff and Retry-After handling
  types/
    api.d.ts           # Types generated from OpenAPI (optional, recommended)
  utils/
    params.ts          # build qs/body from fields
    mapping.ts         # response mappings -> n8n items
```

Notes:
- Keep the UI (descriptions) completely free of transport logic.
- Each `actions/<resource>/<operation>.ts` exports a pure function receiving an `HttpClient` and typed params, and returns data ready for n8n.

---

## Implementation Plan (Step-by-step)

1) Preparation
- Read `openapi-inmobalia.json` and list priority resources/operations: activities, bookings, contacts, enquiries, events, properties, sales, users, web-leads.
- Optional (recommended): generate types with `openapi-typescript` into `nodes/InmobaliaCrm/types/api.d.ts` to strengthen typing.

2) Transport Layer
- `nodes/InmobaliaCrm/transport/client.ts`:
  - Expose `request<T>(options)` using `this.helpers.httpRequestWithAuthentication.call(this, 'inmobaliaCrmOAuth2Api', ...)`.
  - Set a single `baseURL`: `https://api-crm.inmobalia.com/v1` (read from a central constant or credentials in the future).
  - Ensure `Content-Type: application/json` by default; support `multipart` if binary endpoints exist.
  - Error wrapper: catch and raise `NodeApiError` with context.
- `nodes/InmobaliaCrm/transport/pagination.ts`:
  - `paginateAll` helper for endpoints with `page` (0-based), `size`, and optional `sort`.
  - Unwrap content from `content` for responses returning `*PageDTO` (e.g., `WebLeadPageDTO`).
  - Stop by `limit` when `returnAll` is false.
- `nodes/InmobaliaCrm/transport/rateLimit.ts`:
  - Retries on 429/5xx with exponential backoff.
  - Respect `Retry-After` when present.

3) Actions (domain/use-cases)
- For each resource, implement common operations:
  - list (GET with `page`, `size`, `sort`, resource-specific filters), get (GET /:id), create (POST), update (PUT/PATCH), remove (DELETE) according to OpenAPI.
  - Actions receive typed params (query/body/path) and return plain JSON objects.
  - No direct dependency on n8n; they interact via the `HttpClient`.

4) Descriptions (n8n UI)
- `nodes/InmobaliaCrm/descriptions/*.resource.ts` defines:
  - `Resource` (activities, bookings, ...).
  - `Operation` per resource (list, get, create, update, remove, and resource-specific ones if applicable).
  - Input fields: `additionalFields` for optionals; `returnAll`/`limit`; filters; dynamic `loadOptions` when relevant.
  - Clear labels/placeholders; proper types (string, number, boolean, options, collection, fixedCollection, dateTime).

5) Main Node
- `nodes/InmobaliaCrm/InmobaliaCrm.node.ts`:
  - Metadata: `displayName`, `name`, `icon` (you can reuse `credentials/inmobalia-crm.svg`), `group`, `version`, `subtitle`, `description`.
  - `credentials`: `inmobaliaCrmOAuth2Api`.
  - `properties`: import and compose per-resource descriptions.
  - `methods.loadOptions`: useful endpoints for dropdowns (users, properties, etc.) using the `HttpClient`.
  - `execute()`: switch on `resource` and `operation` delegating to `actions/` and packaging the result into `returnData` (array of `INodeExecutionData`).

6) Build and Node Registration
- Add the compiled node to `package.json` → `n8n.nodes` (e.g., `"dist/nodes/InmobaliaCrm/InmobaliaCrm.node.js"`).
- `npm run build` to compile to `dist/` and copy icons.
- `npm run lint` and `npm run format`.

7) Manual Validation
- Import the package into an n8n instance and test:
  - OAuth2 auth with the appropriate scopes.
  - Operations with and without `returnAll`.
  - Filters, sorting, pagination, and error handling (401, 403, 404, 429, 5xx).

---

## OpenAPI Integration

- Reading endpoints: the spec defines paginated listings with `page` (zero-index), `size`, and `sort` (array of strings `field,(asc|desc)`). Some listings return `*PageDTO` with `content`.
- Recommended typing:
  - Add `openapi-typescript` as a devDependency and generate `nodes/InmobaliaCrm/types/api.d.ts` from `openapi-inmobalia.json`.
  - Use those types in `actions/` (e.g., `WebLeadDTO`, `WebLeadPageDTO`).
- URL conventions: all paths under `/v1/` (e.g., `/v1/web-leads`).
- Content types: default `application/json`; handle binaries explicitly if `multipart` or downloads exist.

---

## Key Implementation Details

- Single Base URL
  - Define `const BASE_URL = 'https://api-crm.inmobalia.com/v1';` in `transport/client.ts` and concatenate relative paths.

- Authentication
  - Always use `this.helpers.httpRequestWithAuthentication.call(this, 'inmobaliaCrmOAuth2Api', options)`.
  - Do not inject tokens manually.

- Pagination
  - UI inputs: `returnAll: boolean` and `limit: number`.
  - If `returnAll` is true: iterate `page=0..N` until the response is smaller than `size` or the DTO indicates the end; collect `content` if present.
  - If `returnAll` is false: fetch pages until accumulating `limit`.

- Errors and Retries
  - Wrap HTTP exceptions in `NodeApiError` with `throw new NodeApiError(this.getNode(), error);`.
  - On 429/5xx, retry with exponential backoff and respect `Retry-After`.

- Consistent Output
  - Normalize to `INodeExecutionData[]`: `[{ json: <obj> }]` or `[{ json: <obj1> }, { json: <obj2> }, ...]`.
  - For lists, each element becomes a separate item.

- LoadOptions
  - Add `methods.loadOptions` to populate selectors (e.g., users, statuses, properties) with light requests (small `size`), mapping to `{ name, value }`.

- UI Conventions (n8n)
  - `Resource` property (options: activities, bookings, contacts, enquiries, events, properties, sales, users, webLeads).
  - `Operation` property dependent on resource.
  - `additionalFields` (collection) for optionals; separate `filters` and `options` where helpful.
  - Use `typeOptions` (`minValue`, `maxValue`, `numberPrecision`, `loadOptionsDependsOn`).

---

## TypeScript and n8n Best Practices

- TypeScript
  - `strict` on (already configured). Avoid `any` and use OpenAPI types.
  - Small, pure functions in `actions/`. Do not mix UI and transport.
  - Reuse utilities (`params.ts`, `mapping.ts`).

- n8n Code
  - Do not perform direct HTTP calls (axios/fetch). Use n8n helpers for proxies, credentials, and logging.
  - Respect linters (`eslint-plugin-n8n-nodes-base`). Run `npm run lint` regularly.
  - Maintain compatibility with `n8nNodesApiVersion: 1`.

- Errors and Logs
  - Clear, contextual messages (resource/operation, path, status, non-sensitive body when applicable).
  - Do not log secrets.

- Style and Formatting
  - Run `npm run format` and `npm run lintfix` before publishing.
  - Language: Use English for all texts (code, comments, UI labels, error messages, and documentation). No localization.
  - Consistent, English code naming and UI labels.

---

## Registration in package.json

- Add the compiled node to the `n8n.nodes` array, for example:

```
"n8n": {
  "n8nNodesApiVersion": 1,
  "credentials": [
    "dist/credentials/InmobaliaCrmOAuth2Api.credentials.js"
  ],
  "nodes": [
    "dist/nodes/InmobaliaCrm/InmobaliaCrm.node.js"
  ]
}
```

---

## Delivery Checklist

- `InmobaliaCrm.node.ts` created, compiled, and registered in `package.json`.
- Layers created: `descriptions/`, `actions/`, `transport/`, `utils/`, `types/`.
- Pagination supported (`page`, `size`, `sort`) with `returnAll/limit` in the UI.
- Errors wrapped in `NodeApiError` + retries on 429/5xx.
- `loadOptions` implemented for relevant selects.
- Linter and formatter passing.
- Manual tests successful against an n8n instance.

---

## Delegation Example (Pattern)

- `execute()` (simplified):

```
const items = this.getInputData();
const returnData: INodeExecutionData[] = [];
const resource = this.getNodeParameter('resource', 0) as Resource;
const operation = this.getNodeParameter('operation', 0) as Operation;

const client = httpClient(this); // create client using n8n helpers

if (resource === 'webLeads' && operation === 'list') {
  const returnAll = this.getNodeParameter('returnAll', 0, false) as boolean;
  const limit = this.getNodeParameter('limit', 0, 50) as number;
  const filters = this.getNodeParameter('filters', 0, {}) as WebLeadListFilters;

  const rows = await listWebLeads({ client, returnAll, limit, filters });
  return rows.map((r) => ({ json: r }));
}

// ... other resource/operation combinations
```

- `listWebLeads` action (simplified):

```
export async function listWebLeads({ client, returnAll, limit, filters }: Params) {
  const size = Math.min(200, Math.max(1, filters.size ?? 100));
  const qs = { ...filters, page: 0, size };
  return paginateAll({ client, path: '/web-leads', qs, returnAll, limit, unwrap: 'content' });
}
```

---

## Inmobalia-specific Notes

- Most listings support `page` (0-based index), `size` (default 20), and `sort` (array of strings).
- Paginated DTOs often expose `content`; plan for a generic `unwrap`.
- Handle 401/403/404, 429 (Rate limit), 5xx, and 415/405 as per OpenAPI; define clear messages.

---

## How to Run and Validate

- Mandatory commands (always run during development and before publishing):
  - `npm run build`: builds the project and verifies it compiles correctly (also copies icons to `dist/`).
  - `npm run lint`: validates styles and rules against the repository conventions.
  - `npm run prepublishOnly`: runs build and lint in prepublish mode to guarantee the code is stable and usable.
- Optional:
  - `npm run format`: applies consistent formatting to node files.
- Register the node in `package.json` and test in a self-hosted or development n8n instance, adding OAuth2 credentials with the required scopes.

---

With this, any agent can implement the node incrementally, ensuring a clean, typed, and maintainable architecture aligned with n8n and the Inmobalia CRM API.
