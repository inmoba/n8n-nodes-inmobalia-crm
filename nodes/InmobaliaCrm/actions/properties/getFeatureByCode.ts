import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getPropertyFeatureByCode(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const code = this.getNodeParameter('code', itemIndex) as string
	const res = await client.get<IDataObject>(`/properties/features/by-code/${encodeURIComponent(code)}`)
	return res
}
