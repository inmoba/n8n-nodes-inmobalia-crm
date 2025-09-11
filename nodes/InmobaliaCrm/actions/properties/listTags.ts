import type { IExecuteFunctions } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function listPropertyTags(this: IExecuteFunctions, client: HttpClient) {
	const res = await client.get<string[]>(`/properties/tags`)
	return res
}
