import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getEvent(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const eventId = this.getNodeParameter('eventId', itemIndex) as number
	const res = await client.get<IDataObject>(`/events/${eventId}`)
	return res
}
