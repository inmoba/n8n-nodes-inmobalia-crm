import type { INodeProperties } from 'n8n-workflow'

export const usersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['users'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get user', description: 'Get a user by ID' },
			{
				name: 'Get Me',
				value: 'getMe',
				action: 'Get current user',
				description: 'Get the current token user',
			},
			{ name: 'List', value: 'list', action: 'List users', description: 'List users' },
		],
		default: 'list',
	},
]

export const usersFields: INodeProperties[] = [
	// get by ID
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['get'],
			},
		},
	},

	// list filters
	{
		displayName: 'Filters',
		name: 'filters',
		placeholder: 'Add Filter',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
			},
		],
	},
]
