# n8n-nodes-inmobalia-crm

[![version](https://img.shields.io/npm/v/@inmoba/n8n-nodes-inmobalia-crm.svg)](https://www.npmjs.org/package/@inmoba/n8n-nodes-inmobalia-crm)

n8n nodes for integrating with the Inmobalia CRM real estate platform.

## Features
- OAuth2 authentication with Inmobalia CRM
- Base HTTP Request node for making custom API calls
- Ready to extend with custom nodes for real estate workflows

## Installation

To install this package as a community node in n8n, follow the official n8n guide:

➡️ [Official documentation: Installing community nodes](https://docs.n8n.io/integrations/community-nodes/installation/)

There you will find detailed instructions to safely install and manage community nodes.

## Credentials

This package provides OAuth2 credentials to connect to the Inmobalia CRM API and a base HTTP Request node, allowing you to make custom requests to any endpoint of the Inmobalia CRM API from your n8n workflows. Configure the credentials in n8n with your `Client ID` and `Client Secret` provided by Inmobalia.

See the API documentation for more details about available endpoints: [Inmobalia CRM Swagger](https://api-crm.inmobalia.com/docs/swagger-ui)

## Usage

This package provides authentication and a base HTTP Request node so you can add custom nodes for your Inmobalia CRM workflows.

1. Go to the credentials section in n8n and create a new credential "Inmobalia CRM OAuth2 API".
2. Use the credential created in the previous step in either the "Inmobalia CRM" or the base "HTTP Request" nodes to make API calls

## Resources
- [Inmobalia CRM API Docs](https://api-crm.inmobalia.com/docs/swagger-ui)
- [n8n Documentation](https://docs.n8n.io/)
- [GitHub Repository](https://github.com/inmoba/n8n-nodes-inmobalia-crm)

## License

MIT
