import type { INodeProperties } from 'n8n-workflow';

export const contactsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['contacts'],
      },
    },
    options: [
      { name: 'Get', value: 'get', action: 'Get a contact', description: 'Get a contact by ID' },
      { name: 'List', value: 'list', action: 'List contacts', description: 'List contacts (paginated)' },
      { name: 'List Additional Addresses', value: 'listAdditionals', action: 'List additional addresses', description: 'List additional addresses for a contact' },
      { name: 'List Files', value: 'listFiles', action: 'List files', description: 'List files for a contact' },
      { name: 'List Lead Status', value: 'listLeadStatus', action: 'List lead statuses', description: 'List all contact lead statuses' },
      { name: 'List Sources', value: 'listSources', action: 'List sources', description: 'List all contact sources' },
      { name: 'List Tags', value: 'listTags', action: 'List tags', description: 'List all contact tags' },
    ],
    default: 'list',
  },
];

export const contactsFields: INodeProperties[] = [
  // common id field
  {
    displayName: 'Contact ID',
    name: 'contactId',
    type: 'number',
    default: undefined,
    required: true,
    displayOptions: {
      show: {
        resource: ['contacts'],
        operation: ['get', 'listFiles', 'listAdditionals'],
      },
    },
  },

  // list filters
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['contacts'],
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
        resource: ['contacts'],
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
        resource: ['contacts'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Archived',
        name: 'archived',
        type: 'boolean',
        default: false,
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        default: '',
        placeholder: 'name@email.com',
      },
      {
        displayName: 'Email and Phone as OR',
        name: 'emailAndPhoneAsOr',
        type: 'boolean',
        default: false,
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
        displayName: 'Phone',
        name: 'phone',
        type: 'string',
        default: '',
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
        placeholder: 'property,(asc|desc) | use | to separate multiple',
        default: '',
        description: 'Sorting criteria. For multiple, separate items with |, e.g., "createdDate,desc|ID,asc".',
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
];
