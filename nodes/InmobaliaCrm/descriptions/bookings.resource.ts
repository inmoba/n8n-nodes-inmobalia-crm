import type { INodeProperties } from 'n8n-workflow'

export const bookingsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bookings'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get booking', description: 'Get a booking by ID' },
			{
				name: 'Get by Code',
				value: 'getByCode',
				action: 'Get by code',
				description: 'Get a booking by code',
			},
			{
				name: 'Get Check-In Event',
				value: 'getCheckIn',
				action: 'Get check in event',
				description: 'Get a booking\'s check-in event',
			},
			{
				name: 'Get Check-Out Event',
				value: 'getCheckOut',
				action: 'Get check out event',
				description: 'Get a booking\'s check-out event',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List bookings',
				description: 'List bookings (paginated)',
			},
			{
				name: 'List by Contact',
				value: 'listByContact',
				action: 'List by contact',
				description: 'List bookings by contact ID',
			},
			{
				name: 'List by Property',
				value: 'listByProperty',
				action: 'List by property',
				description: 'List bookings by property ID',
			},
		],
		default: 'list',
	},
]

export const bookingsFields: INodeProperties[] = [
	// ID fields
	{
		displayName: 'Booking ID',
		name: 'bookingId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['get', 'getCheckIn', 'getCheckOut'],
			},
		},
	},
	{
		displayName: 'Code',
		name: 'code',
		type: 'number',
		placeholder: 'e.g., 1000123',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['getByCode'],
			},
		},
	},
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['listByProperty'],
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['listByContact'],
			},
		},
	},

	// list (paginated) - common
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['list', 'listByProperty', 'listByContact'],
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
				resource: ['bookings'],
				operation: ['list', 'listByProperty', 'listByContact'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// filters for list
	{
		displayName: 'Filters',
		name: 'filters',
		placeholder: 'Add Filter',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['bookings'],
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
				displayName: 'From Date End',
				name: 'fromDateEnd',
				type: 'dateTime',
				default: '',
				description: 'End date (date only in API) — date part is used',
			},
			{
				displayName: 'From Date Modified',
				name: 'fromDateModified',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'From Date Start',
				name: 'fromDateStart',
				type: 'dateTime',
				default: '',
				description: 'Start date (date only in API) — date part is used',
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
				displayName: 'To Date Created',
				name: 'toDateCreated',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'To Date End',
				name: 'toDateEnd',
				type: 'dateTime',
				default: '',
				description: 'End date (date only in API) — date part is used',
			},
			{
				displayName: 'To Date Modified',
				name: 'toDateModified',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'To Date Start',
				name: 'toDateStart',
				type: 'dateTime',
				default: '',
				description: 'Start date (date only in API) — date part is used',
			},
		],
	},

	// filters for listByProperty/listByContact
	{
		displayName: 'Filters',
		name: 'filters',
		placeholder: 'Add Filter',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['bookings'],
				operation: ['listByProperty', 'listByContact'],
			},
		},
		options: [
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
		],
	},
]
