import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getUser(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const userId = this.getNodeParameter('userId', itemIndex) as number
	const res = await client.get<IDataObject>(`/users/${userId}`)
	return res
}
