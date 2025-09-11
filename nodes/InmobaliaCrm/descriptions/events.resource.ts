import type { INodeProperties } from 'n8n-workflow'

export const eventsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['events'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get event', description: 'Get an event by ID' },
			{
				name: 'List',
				value: 'list',
				action: 'List events',
				description: 'List events (paginated)',
			},
		],
		default: 'list',
	},
]

export const eventsFields: INodeProperties[] = [
	// ID
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['events'],
				operation: ['get'],
			},
		},
	},

	// list (paginated)
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['events'],
				operation: ['list'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 50,
		displayOptions: {
			show: {
				resource: ['events'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		placeholder: 'Add Filter',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['events'],
				operation: ['list'],
			},
		},
		options: [
			{ displayName: 'From End', name: 'fromEnd', type: 'dateTime', default: '' },
			{ displayName: 'From Start', name: 'fromStart', type: 'dateTime', default: '' },
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0,
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 200 },
				default: 100,
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				placeholder: 'property,(asc|desc)',
				default: '',
				description: 'Single sorting criteria, e.g., "createdDate,desc"',
			},
			{ displayName: 'To End', name: 'toEnd', type: 'dateTime', default: '' },
			{ displayName: 'To Start', name: 'toStart', type: 'dateTime', default: '' },
		],
	},
]
