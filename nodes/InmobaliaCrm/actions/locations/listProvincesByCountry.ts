import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function listProvincesByCountry(
	this: IExecuteFunctions,
	client: HttpClient,
	itemIndex = 0,
) {
	const countryIso = this.getNodeParameter('countryIso', itemIndex) as string
	const res = await client.get<IDataObject[]>(
		`/locations/provinces/by-country/${encodeURIComponent(countryIso)}`,
	)
	return res
}
