# n8n-nodes-inmobalia-crm

[![version](https://img.shields.io/npm/v/@inmoba/n8n-nodes-inmobalia-crm.svg)](https://www.npmjs.org/package/@inmoba/n8n-nodes-inmobalia-crm)

n8n nodes for integrating with the Inmobalia CRM real estate platform.

## Features

- OAuth2 and Personal Access Token (PAT) authentication
- Dedicated Inmobalia CRM node covering all CRM resources
- Automatically stays up-to-date via the node

## Installation

To install this package as a community node in n8n, follow the official n8n guide:

➡️ [Official documentation: Installing community nodes](https://docs.n8n.io/integrations/community-nodes/installation/)

There you will find detailed instructions to safely install and manage community nodes.

## Credentials

This package provides two credential types for the Inmobalia CRM API:

- **Inmobalia CRM OAuth2 API**: For OAuth2 authorization code flow
- **Inmobalia CRM API**: For Personal Access Token (PAT) authentication

Choose the method that best suits your integration needs. Both credential types are also available when using n8n's built-in HTTP Request node under the **Inmobalia CRM** application credentials.

Configure your chosen credential in n8n with your `Client ID` and `Client Secret` (OAuth2) or your `Access Token` (PAT) provided by Inmobalia.

See the API documentation for more details: [Inmobalia CRM Swagger](https://api-crm.inmobalia.com/docs/swagger-ui)

## Usage

1. Create a credential in n8n (OAuth2 or PAT)
2. Add an `Inmobalia CRM` node to your workflow
3. Select a resource and operation - the node handles the rest

All available resources and operations are exposed directly in the node UI. For the full list, refer to the API documentation.

## Resources

- [Inmobalia CRM API Docs](https://api-crm.inmobalia.com/docs/swagger-ui)
- [n8n Documentation](https://docs.n8n.io/)
- [GitHub Repository](https://github.com/inmoba/n8n-nodes-inmobalia-crm)

## License

MIT
