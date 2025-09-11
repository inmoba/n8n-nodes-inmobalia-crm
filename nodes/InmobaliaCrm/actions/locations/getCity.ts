import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getCity(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const cityId = this.getNodeParameter('cityId', itemIndex) as number
	const res = await client.get<IDataObject>(`/locations/cities/${cityId}`)
	return res
}
