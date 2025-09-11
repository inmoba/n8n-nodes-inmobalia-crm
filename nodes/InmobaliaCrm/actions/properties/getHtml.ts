import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getPropertyHtml(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const propertyId = this.getNodeParameter('propertyId', itemIndex) as number
	const htmlId = this.getNodeParameter('htmlId', itemIndex) as number
	const res = await client.get<IDataObject>(`/properties/${propertyId}/htmls/${htmlId}`)
	return res
}
