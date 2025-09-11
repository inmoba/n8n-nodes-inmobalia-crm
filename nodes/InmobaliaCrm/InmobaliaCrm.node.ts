import type {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionType, NodeOperationError } from 'n8n-workflow';

import { createClient } from './transport/client';
import { contactsFields, contactsOperations } from './descriptions';

// Actions (contacts)
import { listContacts } from './actions/contacts/list';
import { getContact } from './actions/contacts/get';
import { listContactFiles } from './actions/contacts/listFiles';
import { listContactAdditionals } from './actions/contacts/listAdditionals';
import { listContactTags } from './actions/contacts/listTags';
import { listContactSources } from './actions/contacts/listSources';
import { listContactLeadStatus } from './actions/contacts/listLeadStatus';

export class InmobaliaCrm implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Inmobalia CRM',
    name: 'inmobaliaCrm',
    icon: 'file:inmobalia-crm.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Inmobalia CRM API',
    defaults: {
      name: 'Inmobalia CRM',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'inmobaliaCrmOAuth2Api',
        required: true,
      },
    ],
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Contact', value: 'contacts' },
        ],
        default: 'contacts',
      },

      // Operations and fields per resource
      ...contactsOperations,
      ...contactsFields,
    ],
  };

  methods = {
    loadOptions: {
      // Reserved for future dynamic options
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const returnData: INodeExecutionData[] = [];
    const client = createClient(this);

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    try {
      if (resource === 'contacts') {
        if (operation === 'list') {
          const rows = await listContacts.call(this, client, 0);
          for (const r of rows as IDataObject[]) returnData.push({ json: r });
        } else if (operation === 'get') {
          const r = await getContact.call(this, client, 0);
          returnData.push({ json: r as IDataObject });
        } else if (operation === 'listFiles') {
          const rows = await listContactFiles.call(this, client, 0);
          for (const r of rows as IDataObject[]) returnData.push({ json: r });
        } else if (operation === 'listAdditionals') {
          const rows = await listContactAdditionals.call(this, client, 0);
          for (const r of rows as IDataObject[]) returnData.push({ json: r });
        } else if (operation === 'listTags') {
          const rows = await listContactTags.call(this, client);
          for (const r of rows as unknown as string[]) returnData.push({ json: { value: r } });
        } else if (operation === 'listSources') {
          const rows = await listContactSources.call(this, client);
          for (const r of rows as IDataObject[]) returnData.push({ json: r });
        } else if (operation === 'listLeadStatus') {
          const rows = await listContactLeadStatus.call(this, client);
          for (const r of rows as unknown as string[]) returnData.push({ json: { value: r } });
        } else {
          throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`);
        }
      } else {
        throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`);
      }
    } catch (error) {
      throw new NodeApiError(this.getNode(), error as unknown as JsonObject);
    }

    return [returnData];
  }
}
