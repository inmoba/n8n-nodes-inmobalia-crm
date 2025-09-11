import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getCountry(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const countryId = this.getNodeParameter('countryId', itemIndex) as number
	const res = await client.get<IDataObject>(`/locations/countries/${countryId}`)
	return res
}
