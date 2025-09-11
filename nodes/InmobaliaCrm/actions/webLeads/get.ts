import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getWebLead(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const webLeadId = this.getNodeParameter('webLeadId', itemIndex) as number
	const res = await client.get<IDataObject>(`/web-leads/${webLeadId}`)
	return res
}
