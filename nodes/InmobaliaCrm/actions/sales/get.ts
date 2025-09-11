import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getSale(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const saleId = this.getNodeParameter('saleId', itemIndex) as number
	const res = await client.get<IDataObject>(`/sales/${saleId}`)
	return res
}
