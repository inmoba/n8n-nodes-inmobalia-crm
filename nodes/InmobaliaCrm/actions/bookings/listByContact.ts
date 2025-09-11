import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'
import { paginateAll } from '../../transport/pagination'

export async function listBookingsByContact(
	this: IExecuteFunctions,
	client: HttpClient,
	itemIndex = 0,
) {
	const contactId = this.getNodeParameter('contactId', itemIndex) as number
	const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false)
	const limit: number = this.getNodeParameter('limit', itemIndex, 50)
	const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {})

	// Sort: allow only a single field as provided; no normalization

	const rows = await paginateAll<IDataObject>({
		client,
		path: `/bookings/by-contact/${contactId}`,
		qs: filters,
		unwrap: 'content',
		returnAll,
		limit,
	})

	return rows
}
