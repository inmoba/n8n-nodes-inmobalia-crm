import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';
import { IAuthenticateGeneric, ICredentialTestRequest } from 'n8n-workflow/dist/Interfaces.js';
import { INMOBALIA_API_BASE_URL } from '../nodes/InmobaliaCrm/transport/client';

const httpRequestNode: ICredentialType['httpRequestNode'] = {
	name: 'Inmobalia CRM',
	docsUrl: 'https://api-crm.inmobalia.com/docs/swagger-ui',
	apiBaseUrl: INMOBALIA_API_BASE_URL,
}

export class InmobaliaCrmPatApi implements ICredentialType {
	name = 'inmobaliaCrmPatApi'

	displayName = 'Inmobalia CRM API'

	documentationUrl = 'https://api-crm.inmobalia.com/docs/swagger-ui'

	icon: Icon = 'file:inmobalia-crm.svg'

	httpRequestNode = httpRequestNode

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	]

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=bearer {{$credentials?.accessToken}}',
			},
		},
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL: INMOBALIA_API_BASE_URL,
			url: '/users/me',
			method: 'GET',
		},
	}

}
