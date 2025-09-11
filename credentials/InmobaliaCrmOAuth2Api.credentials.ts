import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow'

const scopes = [
	'activities:read',
	'activities:write',
	'bookings:read',
	'contacts:read',
	'contacts:write',
	'enquiries:read',
	'events:read',
	'properties:read',
	'properties:write',
	'sales:read',
	'users:read',
	'web-leads:read',
	'web-leads:write',
]

export class InmobaliaCrmOAuth2Api implements ICredentialType {
	name = 'inmobaliaCrmOAuth2Api'

	extends = ['oAuth2Api']

	displayName = 'Inmobalia CRM OAuth2 API'

	documentationUrl = 'https://api-crm.inmobalia.com/docs/swagger-ui'

	icon: Icon = 'file:inmobalia-crm.svg'

	httpRequestNode = {
		name: 'Inmobalia CRM',
		docsUrl: 'https://api-crm.inmobalia.com/docs/swagger-ui',
		apiBaseUrl: 'https://api-crm.inmobalia.com/v1/',
	}

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://auth.inmobalia.com/oauth2/authorize',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://auth.inmobalia.com/oauth2/token',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: scopes.join(' '),
			required: true,
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	]
}
