import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getPropertyByReference(
	this: IExecuteFunctions,
	client: HttpClient,
	itemIndex = 0,
) {
	const reference = this.getNodeParameter('reference', itemIndex) as string
	const res = await client.get<IDataObject>(
		`/properties/by-reference/${encodeURIComponent(reference)}`,
	)
	return res
}
