import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getProvince(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const provinceId = this.getNodeParameter('provinceId', itemIndex) as number
	const res = await client.get<IDataObject>(`/locations/provinces/${provinceId}`)
	return res
}
