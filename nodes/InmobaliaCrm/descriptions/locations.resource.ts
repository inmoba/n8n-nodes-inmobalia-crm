import type { INodeProperties } from 'n8n-workflow'

export const locationsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['locations'],
			},
		},
		options: [
			{ name: 'Get Area', value: 'getArea', action: 'Get area', description: 'Get an area by ID' },
			{ name: 'Get City', value: 'getCity', action: 'Get city', description: 'Get a city by ID' },
			{
				name: 'Get Country',
				value: 'getCountry',
				action: 'Get country',
				description: 'Get a country by ID',
			},
			{
				name: 'Get Country by ISO',
				value: 'getCountryByIso',
				action: 'Get country by ISO',
				description: 'Get a country by ISO',
			},
			{
				name: 'Get Province',
				value: 'getProvince',
				action: 'Get province',
				description: 'Get a province by ID',
			},
			{
				name: 'Get Subarea',
				value: 'getSubarea',
				action: 'Get subarea',
				description: 'Get a subarea by ID',
			},
			{
				name: 'List Areas by City',
				value: 'listAreasByCity',
				action: 'List areas by city',
				description: 'List areas by city ID',
			},
			{
				name: 'List Cities by Province',
				value: 'listCitiesByProvince',
				action: 'List cities by province',
				description: 'List cities by province ID',
			},
			{
				name: 'List Countries',
				value: 'listCountries',
				action: 'List countries',
				description: 'List all countries',
			},
			{
				name: 'List Provinces by Country ISO',
				value: 'listProvincesByCountry',
				action: 'List provinces by country ISO',
			},
			{
				name: 'List Subareas by Area',
				value: 'listSubareasByArea',
				action: 'List subareas by area',
				description: 'List subareas by area ID',
			},
		],
		default: 'listCountries',
	},
]

export const locationsFields: INodeProperties[] = [
	// IDs and identifiers
	{
		displayName: 'Country ID',
		name: 'countryId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getCountry'],
			},
		},
	},
	{
		displayName: 'Country ISO',
		name: 'countryIso',
		type: 'string',
		placeholder: 'e.g., ES',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getCountryByIso', 'listProvincesByCountry'],
			},
		},
	},
	{
		displayName: 'Province ID',
		name: 'provinceId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getProvince', 'listCitiesByProvince'],
			},
		},
	},
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getCity', 'listAreasByCity'],
			},
		},
	},
	{
		displayName: 'Area ID',
		name: 'areaId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getArea', 'listSubareasByArea'],
			},
		},
	},
	{
		displayName: 'Subarea ID',
		name: 'subareaId',
		type: 'number',
		default: undefined,
		required: true,
		displayOptions: {
			show: {
				resource: ['locations'],
				operation: ['getSubarea'],
			},
		},
	},
]
