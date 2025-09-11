import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function listCitiesByProvince(
	this: IExecuteFunctions,
	client: HttpClient,
	itemIndex = 0,
) {
	const provinceId = this.getNodeParameter('provinceId', itemIndex) as number
	const res = await client.get<IDataObject[]>(`/locations/cities/by-province/${provinceId}`)
	return res
}
