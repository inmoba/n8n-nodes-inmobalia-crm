import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function listUsers(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {})
	const res = await client.get<IDataObject[]>(`/users`, filters)
	return res
}
