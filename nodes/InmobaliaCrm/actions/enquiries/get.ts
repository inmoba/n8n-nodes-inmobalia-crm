import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getEnquiry(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const enquiryId = this.getNodeParameter('enquiryId', itemIndex) as number
	const res = await client.get<IDataObject>(`/enquiries/${enquiryId}`)
	return res
}
