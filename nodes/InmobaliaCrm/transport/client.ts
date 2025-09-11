import type { IExecuteFunctions, ILoadOptionsFunctions, IHttpRequestOptions, IDataObject, JsonObject } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const BASE_URL = 'https://api-crm.inmobalia.com/v1';

type Context = IExecuteFunctions | ILoadOptionsFunctions;

export interface HttpClient {
	request<T = unknown>(options: IHttpRequestOptions): Promise<T>;
	get<T = unknown>(path: string, qs?: IDataObject): Promise<T>;
}

export function createClient(context: Context): HttpClient {
	return {
		async request<T>(options: IHttpRequestOptions): Promise<T> {
			try {
				const response = await (context as IExecuteFunctions).helpers
					.httpRequestWithAuthentication.call<Context, [string, IHttpRequestOptions], Promise<T>>(
						context,
						'inmobaliaCrmOAuth2Api',
						{
							baseURL: BASE_URL,
							json: true,
							...options,
						} as IHttpRequestOptions,
					);
				return response;
			} catch (error) {
				throw new NodeApiError((context as IExecuteFunctions).getNode(), error as unknown as JsonObject);
			}
		},

		async get<T>(path: string, qs?: IDataObject): Promise<T> {
			return this.request<T>({ method: 'GET', url: path, qs });
		},
	};
}

export const ClientBaseUrl = BASE_URL;
