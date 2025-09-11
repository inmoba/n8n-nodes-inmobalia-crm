import type { INodeProperties } from 'n8n-workflow'

export const propertiesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['properties'],
			},
		},
		options: [
			{ name: 'Get', value: 'get', action: 'Get property', description: 'Get a property by ID' },
			{ name: 'Get by Reference', value: 'getByReference', action: 'Get by reference', description: 'Get a property by reference' },
			{ name: 'Get Category', value: 'getCategory', action: 'Get category', description: 'Get a property category by ID' },
			{ name: 'Get Description', value: 'getDescription', action: 'Get description', description: 'Get one description by language' },
			{ name: 'Get Feature by Code', value: 'getFeatureByCode', action: 'Get feature by code', description: 'Get property feature by code' },
			{ name: 'Get File', value: 'getFile', action: 'Get file', description: 'Get one file of a property' },
			{ name: 'Get HTML', value: 'getHtml', action: 'Get HTML snippet', description: 'Get one HTML snippet of a property' },
			{ name: 'Get Image', value: 'getImage', action: 'Get image', description: 'Get one image of a property' },
			{ name: 'Get Link', value: 'getLink', action: 'Get link', description: 'Get one link of a property' },
			{ name: 'Get Type', value: 'getType', action: 'Get type', description: 'Get a property type by ID' },
			{ name: 'List', value: 'list', action: 'List properties', description: 'List properties (paginated)' },
			{ name: 'List Categories', value: 'listCategories', action: 'List categories', description: 'List property categories' },
			{ name: 'List Custom Features', value: 'listCustomFeatures', action: 'List custom features', description: 'List custom property features' },
			{ name: 'List Descriptions', value: 'listDescriptions', action: 'List descriptions', description: 'List descriptions for a property' },
			{ name: 'List Features', value: 'listFeatures', action: 'List features', description: 'List property features' },
			{ name: 'List Files', value: 'listFiles', action: 'List files', description: 'List files of a property' },
			{ name: 'List HTMLs', value: 'listHtmls', action: 'List HTML snippets', description: 'List HTML snippets for a property' },
			{ name: 'List Images', value: 'listImages', action: 'List images', description: 'List images of a property' },
			{ name: 'List Links', value: 'listLinks', action: 'List links', description: 'List links of a property' },
			{ name: 'List Tags', value: 'listTags', action: 'List tags', description: 'List property tags' },
			{ name: 'List Types', value: 'listTypes', action: 'List types', description: 'List property types' },
		],
		default: 'list',
	},
]

export const propertiesFields: INodeProperties[] = [
	// common property id
	{
		displayName: 'Property ID',
		name: 'propertyId',
		type: 'number',
		placeholder: 'e.g., 12345',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: [
					'get',
					'listFiles',
					'getFile',
					'listImages',
					'getImage',
					'listLinks',
					'getLink',
					'listDescriptions',
					'getDescription',
					'listHtmls',
					'getHtml',
				],
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
				resource: ['properties'],
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
				resource: ['properties'],
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
				resource: ['properties'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Country ISO',
				name: 'countryIso',
				type: 'string',
				default: '',
				placeholder: 'ES',
				description: 'Country ISO code',
			},
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
				displayName: 'Publish Statuses',
				name: 'statusPublish',
				type: 'string',
				default: '',
				placeholder: 'PUBLISHED|DRAFT',
				description: 'Multiple allowed, separate with |',
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
				displayName: 'To Date Modified',
				name: 'toDateModified',
				type: 'dateTime',
				default: '',
			},
		],
	},

	// detail ids
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getFile'],
			},
		},
	},
	{
		displayName: 'Image ID',
		name: 'imageId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getImage'],
			},
		},
	},
	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getLink'],
			},
		},
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getDescription'],
			},
		},
	},
	{
		displayName: 'HTML ID',
		name: 'htmlId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getHtml'],
			},
		},
	},
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getByReference'],
			},
		},
	},
	{
		displayName: 'Type ID',
		name: 'typeId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getType'],
			},
		},
	},
	{
		displayName: 'Feature Code',
		name: 'code',
		type: 'string',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getFeatureByCode'],
			},
		},
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['properties'],
				operation: ['getCategory'],
			},
		},
	},
]
