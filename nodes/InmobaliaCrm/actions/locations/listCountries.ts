import type { HttpClient } from '../../transport/client'
import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'

export async function listCountries(this: IExecuteFunctions, client: HttpClient) {
	const res = await client.get<IDataObject[]>(`/locations/countries`)
	return res
}
