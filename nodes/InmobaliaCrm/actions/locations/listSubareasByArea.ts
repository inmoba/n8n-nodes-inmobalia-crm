import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function listSubareasByArea(
	this: IExecuteFunctions,
	client: HttpClient,
	itemIndex = 0,
) {
	const areaId = this.getNodeParameter('areaId', itemIndex) as number
	const res = await client.get<IDataObject[]>(`/locations/subareas/by-area/${areaId}`)
	return res
}
