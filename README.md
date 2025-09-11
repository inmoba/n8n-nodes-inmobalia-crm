# n8n-nodes-inmobalia-crm

[![version](https://img.shields.io/npm/v/@inmoba/n8n-nodes-inmobalia-crm.svg)](https://www.npmjs.org/package/@inmoba/n8n-nodes-inmobalia-crm)

n8n nodes for integrating with the Inmobalia CRM real estate platform.

## Features
- OAuth2 authentication with Inmobalia CRM
- Base HTTP Request node for making custom API calls
- Inmobalia CRM node with:
  - Contacts: list, get, files, additional addresses, lead status, sources, tags
  - Properties (all GET operations): list, get, get by reference, files (list/get), images (list/get), links (list/get), descriptions (list/get), HTMLs (list/get), tags (list), types (list/get), features (list), custom features (list), feature by code (get), categories (list/get)
- Ready to extend with more resources and operations

## Installation

To install this package as a community node in n8n, follow the official n8n guide:

➡️ [Official documentation: Installing community nodes](https://docs.n8n.io/integrations/community-nodes/installation/)

There you will find detailed instructions to safely install and manage community nodes.

## Credentials

This package provides OAuth2 credentials to connect to the Inmobalia CRM API and a dedicated Inmobalia CRM node for Contacts and Properties. Configure the credentials in n8n with your `Client ID` and `Client Secret` provided by Inmobalia.

See the API documentation for more details about available endpoints: [Inmobalia CRM Swagger](https://api-crm.inmobalia.com/docs/swagger-ui)

## Usage

1. Go to the credentials section in n8n and create a new credential `Inmobalia CRM OAuth2 API`.
2. Use the credential in the `Inmobalia CRM` node. Choose a Resource and Operation.
3. Supported resources and operations:
   - Contacts: list (with returnAll/limit and filters), get, list files, list additional addresses, list lead status, list sources, list tags
   - Properties:
     - Listings: list (with returnAll/limit and filters: date created/modified range, country ISO, publish status, sort)
     - Single property: get by ID, get by reference
     - Files: list files, get file
     - Images: list images, get image
     - Links: list links, get link
     - Descriptions: list descriptions, get description by language
     - HTMLs: list HTML snippets, get HTML snippet
     - Taxonomies: tags (list), types (list/get), categories (list/get)
     - Features: features (list), custom features (list), feature by code (get)

## Resources
- [Inmobalia CRM API Docs](https://api-crm.inmobalia.com/docs/swagger-ui)
- [n8n Documentation](https://docs.n8n.io/)
- [GitHub Repository](https://github.com/inmoba/n8n-nodes-inmobalia-crm)

## License

MIT
