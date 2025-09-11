import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow'
import { NodeApiError, NodeConnectionType, NodeOperationError } from 'n8n-workflow'

import { createClient } from './transport/client'
import { contactsFields, contactsOperations } from './descriptions'
import { propertiesFields, propertiesOperations } from './descriptions'
import { bookingsFields, bookingsOperations } from './descriptions'

// Actions (contacts)
import { listContacts } from './actions/contacts/list'
import { getContact } from './actions/contacts/get'
import { listContactFiles } from './actions/contacts/listFiles'
import { listContactAdditionals } from './actions/contacts/listAdditionals'
import { listContactTags } from './actions/contacts/listTags'
import { listContactSources } from './actions/contacts/listSources'
import { listContactLeadStatus } from './actions/contacts/listLeadStatus'

// Actions (properties)
import { listProperties } from './actions/properties/list'
import { getProperty } from './actions/properties/get'
import { getPropertyByReference } from './actions/properties/getByReference'
import { listPropertyFiles } from './actions/properties/listFiles'
import { getPropertyFile } from './actions/properties/getFile'
import { listPropertyImages } from './actions/properties/listImages'
import { getPropertyImage } from './actions/properties/getImage'
import { listPropertyLinks } from './actions/properties/listLinks'
import { getPropertyLink } from './actions/properties/getLink'
import { listPropertyDescriptions } from './actions/properties/listDescriptions'
import { getPropertyDescription } from './actions/properties/getDescription'
import { listPropertyHtmls } from './actions/properties/listHtmls'
import { getPropertyHtml } from './actions/properties/getHtml'
import { listPropertyTags } from './actions/properties/listTags'
import { listPropertyTypes } from './actions/properties/listTypes'
import { getPropertyType } from './actions/properties/getType'
import { listPropertyFeatures } from './actions/properties/listFeatures'
import { listPropertyCustomFeatures } from './actions/properties/listCustomFeatures'
import { getPropertyFeatureByCode } from './actions/properties/getFeatureByCode'
import { listPropertyCategories } from './actions/properties/listCategories'
import { getPropertyCategory } from './actions/properties/getCategory'

// Actions (bookings)
import { listBookings } from './actions/bookings/list'
import { getBooking } from './actions/bookings/get'
import { listBookingsByProperty } from './actions/bookings/listByProperty'
import { listBookingsByContact } from './actions/bookings/listByContact'
import { getBookingByCode } from './actions/bookings/getByCode'
import { getBookingCheckIn } from './actions/bookings/getCheckIn'
import { getBookingCheckOut } from './actions/bookings/getCheckOut'

export class InmobaliaCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Inmobalia CRM',
		name: 'inmobaliaCrm',
		icon: 'file:inmobalia-crm.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Inmobalia CRM API',
		defaults: {
			name: 'Inmobalia CRM',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'inmobaliaCrmOAuth2Api',
				required: true,
			},
		],
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Contact', value: 'contacts' },
					{ name: 'Property', value: 'properties' },
					{ name: 'Booking', value: 'bookings' },
				],
				default: 'contacts',
			},

			// Operations and fields per resource
			...contactsOperations,
			...contactsFields,
			...propertiesOperations,
			...propertiesFields,
			...bookingsOperations,
			...bookingsFields,
		],
	}

	methods = {
		loadOptions: {
			// Reserved for future dynamic options
		},
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = []
		const client = createClient(this)

		const resource = this.getNodeParameter('resource', 0)
		const operation = this.getNodeParameter('operation', 0)

		try {
			if (resource === 'contacts') {
				if (operation === 'list') {
					const rows = await listContacts.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'get') {
					const r = await getContact.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listFiles') {
					const rows = await listContactFiles.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'listAdditionals') {
					const rows = await listContactAdditionals.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'listTags') {
					const rows = await listContactTags.call(this, client)
					for (const r of rows as unknown as string[]) returnData.push({ json: { value: r } })
				}
				else if (operation === 'listSources') {
					const rows = await listContactSources.call(this, client)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'listLeadStatus') {
					const rows = await listContactLeadStatus.call(this, client)
					for (const r of rows as unknown as string[]) returnData.push({ json: { value: r } })
				}
				else {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`)
				}
			}
			else if (resource === 'properties') {
				if (operation === 'list') {
					const rows = await listProperties.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'get') {
					const r = await getProperty.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'getByReference') {
					const r = await getPropertyByReference.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listFiles') {
					const rows = await listPropertyFiles.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getFile') {
					const r = await getPropertyFile.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listImages') {
					const rows = await listPropertyImages.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getImage') {
					const r = await getPropertyImage.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listLinks') {
					const rows = await listPropertyLinks.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getLink') {
					const r = await getPropertyLink.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listDescriptions') {
					const rows = await listPropertyDescriptions.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getDescription') {
					const r = await getPropertyDescription.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listHtmls') {
					const rows = await listPropertyHtmls.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getHtml') {
					const r = await getPropertyHtml.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listTags') {
					const rows = await listPropertyTags.call(this, client)
					for (const r of rows as unknown as string[]) returnData.push({ json: { value: r } })
				}
				else if (operation === 'listTypes') {
					const rows = await listPropertyTypes.call(this, client)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getType') {
					const r = await getPropertyType.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listFeatures') {
					const rows = await listPropertyFeatures.call(this, client)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'listCustomFeatures') {
					const rows = await listPropertyCustomFeatures.call(this, client)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getFeatureByCode') {
					const r = await getPropertyFeatureByCode.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listCategories') {
					const rows = await listPropertyCategories.call(this, client)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getCategory') {
					const r = await getPropertyCategory.call(this, client, 0)
					returnData.push({ json: r })
				}
				else {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`)
				}
			}
			else if (resource === 'bookings') {
				if (operation === 'list') {
					const rows = await listBookings.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'get') {
					const r = await getBooking.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'listByProperty') {
					const rows = await listBookingsByProperty.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'listByContact') {
					const rows = await listBookingsByContact.call(this, client, 0)
					for (const r of rows) returnData.push({ json: r })
				}
				else if (operation === 'getByCode') {
					const r = await getBookingByCode.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'getCheckIn') {
					const r = await getBookingCheckIn.call(this, client, 0)
					returnData.push({ json: r })
				}
				else if (operation === 'getCheckOut') {
					const r = await getBookingCheckOut.call(this, client, 0)
					returnData.push({ json: r })
				}
				else {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`)
				}
			}
			else {
				throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`)
			}
		}
		catch (error) {
			throw new NodeApiError(this.getNode(), error as unknown as JsonObject)
		}

		return [returnData]
	}
}
