import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'
import { paginateAll } from '../../transport/pagination'
import { normalizeDateParams } from '../../utils/dates'

export async function listEvents(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const returnAll: boolean = this.getNodeParameter('returnAll', itemIndex, false)
	const limit: number = this.getNodeParameter('limit', itemIndex, 50)
	const filters: IDataObject = this.getNodeParameter('filters', itemIndex, {})

	const normalized = normalizeDateParams(filters, {
		dateTimeKeys: ['fromStart', 'toStart', 'fromEnd', 'toEnd'],
	})

	const rows = await paginateAll<IDataObject>({
		client,
		path: '/events',
		qs: normalized,
		unwrap: 'content',
		returnAll,
		limit,
	})

	return rows
}
