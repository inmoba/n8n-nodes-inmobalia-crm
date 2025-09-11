import type { IExecuteFunctions, IDataObject } from 'n8n-workflow'
import type { HttpClient } from '../../transport/client'

export async function getCountryByIso(this: IExecuteFunctions, client: HttpClient, itemIndex = 0) {
	const countryIso = this.getNodeParameter('countryIso', itemIndex) as string
	const res = await client.get<IDataObject>(
		`/locations/countries/by-iso/${encodeURIComponent(countryIso)}`,
	)
	return res
}
