import type { INodeProperties } from 'n8n-workflow'

export const salesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sales'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get sale', description: 'Get a sale by ID' },
			{ name: 'List', value: 'list', action: 'List sales', description: 'List sales (paginated)' },
		],
		default: 'list',
	},
]

export const salesFields: INodeProperties[] = [
	{
		displayName: 'Sale ID',
		name: 'saleId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['sales'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['sales'],
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
				resource: ['sales'],
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
				resource: ['sales'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'From Date Created',
				name: 'fromDateCreated',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'From Date Modified',
				name: 'fromDateModified',
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
				default: 'IN_PROGRESS',
				options: [
					{ name: 'In Progress', value: 'IN_PROGRESS' },
					{ name: 'Lost', value: 'LOST' },
					{ name: 'Won', value: 'WON' },
				],
			},
			{
				displayName: 'To Date Created',
				name: 'toDateCreated',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'To Date Modified',
				name: 'toDateModified',
				type: 'dateTime',
				default: '',
			},
		],
	},
]
