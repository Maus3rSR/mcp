import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const webhookTools: Tool[] = [
  {
    name: "hiboutik_webhook_list",
    description: "List all webhooks",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_webhook_get",
    description: "Get a webhook by ID",
    inputSchema: {
      type: "object",
      properties: {
        webhook_id: { type: "number", description: "Webhook ID" },
      },
      required: ["webhook_id"],
    },
  },
  {
    name: "hiboutik_webhook_create",
    description: "Create a new webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhook_url: { type: "string", description: "Webhook URL endpoint" },
        webhook_event: { type: "string", description: "Event to subscribe to (e.g., sale.closed, customer.created)" },
        webhook_active: { type: "boolean", description: "Is webhook active" },
        webhook_secret: { type: "string", description: "Secret for signature verification" },
      },
      required: ["webhook_url", "webhook_event"],
    },
  },
  {
    name: "hiboutik_webhook_update",
    description: "Update a webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhook_id: { type: "number", description: "Webhook ID" },
        webhook_url: { type: "string", description: "Webhook URL endpoint" },
        webhook_event: { type: "string", description: "Event to subscribe to" },
        webhook_active: { type: "boolean", description: "Is webhook active" },
        webhook_secret: { type: "string", description: "Secret for signature verification" },
      },
      required: ["webhook_id"],
    },
  },
  {
    name: "hiboutik_webhook_delete",
    description: "Delete a webhook",
    inputSchema: {
      type: "object",
      properties: {
        webhook_id: { type: "number", description: "Webhook ID" },
      },
      required: ["webhook_id"],
    },
  },
];

export async function handleWebhookTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_webhook_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/webhooks?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_webhook_get": {
      const result = await hiboutikRequest(config, `/webhooks/${params.webhook_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_webhook_create": {
      const result = await hiboutikFormRequest(config, "/webhooks/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_webhook_update": {
      const result = await hiboutikFormRequest(config, `/webhooks/${params.webhook_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_webhook_delete": {
      const result = await hiboutikFormRequest(config, `/webhooks/${params.webhook_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown webhook tool: ${name}`);
  }
}
