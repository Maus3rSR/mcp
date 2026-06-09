import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const actionLinkTools: Tool[] = [
  {
    name: "hiboutik_action_link_list",
    description: "List all action links/buttons",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_action_link_get",
    description: "Get an action link by ID",
    inputSchema: {
      type: "object",
      properties: {
        action_link_id: { type: "number", description: "Action link ID" },
      },
      required: ["action_link_id"],
    },
  },
  {
    name: "hiboutik_action_link_create",
    description: "Create a new action link/button",
    inputSchema: {
      type: "object",
      properties: {
        action_link_label: { type: "string", description: "Link label/text" },
        action_link_location: { type: "string", description: "Location (sale, product, customer, etc.)" },
        action_link_url: { type: "string", description: "Target URL" },
        action_link_type: { type: "string", description: "Type (page, embedded, silent)" },
        action_link_target: { type: "string", description: "Target (_self, _blank, _top)" },
        action_link_store_id: { type: "number", description: "Store ID (0 for all)" },
        action_link_user_id: { type: "number", description: "User ID (0 for all)" },
        app_link_id: { type: "string", description: "Unique app link ID" },
      },
      required: ["action_link_label", "action_link_location", "action_link_url"],
    },
  },
  {
    name: "hiboutik_action_link_update",
    description: "Update an action link",
    inputSchema: {
      type: "object",
      properties: {
        action_link_id: { type: "number", description: "Action link ID" },
        action_link_label: { type: "string", description: "Link label/text" },
        action_link_location: { type: "string", description: "Location" },
        action_link_url: { type: "string", description: "Target URL" },
        action_link_type: { type: "string", description: "Type" },
        action_link_target: { type: "string", description: "Target" },
        action_link_store_id: { type: "number", description: "Store ID" },
        action_link_user_id: { type: "number", description: "User ID" },
      },
      required: ["action_link_id"],
    },
  },
  {
    name: "hiboutik_action_link_delete",
    description: "Delete an action link",
    inputSchema: {
      type: "object",
      properties: {
        action_link_id: { type: "number", description: "Action link ID" },
      },
      required: ["action_link_id"],
    },
  },
  {
    name: "hiboutik_action_link_exec",
    description: "Execute an action link",
    inputSchema: {
      type: "object",
      properties: {
        action_link_id: { type: "number", description: "Action link ID" },
        context_data: { type: "object", description: "Context data to pass to the action" },
      },
      required: ["action_link_id"],
    },
  },
];

export async function handleActionLinkTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_action_link_list": {
      const result = await hiboutikRequest(config, "/action_links");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_action_link_get": {
      const result = await hiboutikRequest(config, `/action_links/${params.action_link_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_action_link_create": {
      const result = await hiboutikFormRequest(config, "/action_links/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_action_link_update": {
      const result = await hiboutikFormRequest(config, `/action_links/${params.action_link_id}`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_action_link_delete": {
      const result = await hiboutikFormRequest(config, `/action_links/${params.action_link_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_action_link_exec": {
      const result = await hiboutikFormRequest(config, "/action_link_exec/", "POST", {
        action_link_id: params.action_link_id,
        ...((params.context_data as Record<string, unknown>) || {}),
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown action link tool: ${name}`);
  }
}
