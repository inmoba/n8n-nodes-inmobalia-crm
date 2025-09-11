import type { INodeProperties } from 'n8n-workflow'

export const enquiriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enquiries'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get enquiry', description: 'Get an enquiry by ID' },
			{
				name: 'List',
				value: 'list',
				action: 'List enquiries',
				description: 'List enquiries (paginated)',
			},
		],
		default: 'list',
	},
]

export const enquiriesFields: INodeProperties[] = [
	{
		displayName: 'Enquiry ID',
		name: 'enquiryId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['enquiries'],
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
				resource: ['enquiries'],
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
				resource: ['enquiries'],
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
				resource: ['enquiries'],
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
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Active', value: 'ACTIVE' },
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
			{
				displayName: 'Transaction Type',
				name: 'transactionType',
				type: 'options',
				default: 'SALE',
				options: [
					{ name: 'Rent (Long Term)', value: 'RENT_LONGTERM' },
					{ name: 'Rent (Short Term)', value: 'RENT_SHORTTERM' },
					{ name: 'Sale', value: 'SALE' },
				],
			},
		],
	},
]
