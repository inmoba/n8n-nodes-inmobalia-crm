import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getPropertyType(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const typeId = this.getNodeParameter('typeId', itemIndex) as number
	const res = await client.get<IDataObject>(`/properties/types/${typeId}`)
	return res
}
