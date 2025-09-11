import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getArea(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const areaId = this.getNodeParameter('areaId', itemIndex) as number
	const res = await client.get<IDataObject>(`/locations/areas/${areaId}`)
	return res
}
