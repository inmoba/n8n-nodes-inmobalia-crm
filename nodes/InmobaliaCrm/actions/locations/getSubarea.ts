import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getSubarea(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const subareaId = this.getNodeParameter('subareaId', itemIndex) as number
	const res = await client.get<IDataObject>(`/locations/subareas/${subareaId}`)
	return res
}
