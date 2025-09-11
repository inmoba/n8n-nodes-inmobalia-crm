import type { INodeProperties } from 'n8n-workflow'

export const webLeadsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webLeads'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get web lead', description: 'Get a web lead by ID' },
			{
				name: 'List',
				value: 'list',
				action: 'List web leads',
				description: 'List web leads (paginated)',
			},
		],
		default: 'list',
	},
]

export const webLeadsFields: INodeProperties[] = [
	// get by ID
	{
		displayName: 'Web Lead ID',
		name: 'webLeadId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['webLeads'],
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
				resource: ['webLeads'],
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
				resource: ['webLeads'],
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
				resource: ['webLeads'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
			},
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
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'PENDING',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Processed', value: 'PROCESSED' },
				],
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
			},
		],
	},
]
