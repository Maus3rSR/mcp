import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const modifierTools: Tool[] = [
  {
    name: "hiboutik_modifier_list",
    description: "List all product modifiers",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_modifier_get",
    description: "Get a modifier by ID",
    inputSchema: {
      type: "object",
      properties: {
        modifier_id: { type: "number", description: "Modifier ID" },
      },
      required: ["modifier_id"],
    },
  },
  {
    name: "hiboutik_modifier_create",
    description: "Create a new modifier",
    inputSchema: {
      type: "object",
      properties: {
        modifier_name: { type: "string", description: "Modifier name" },
        modifier_price: { type: "number", description: "Modifier price adjustment" },
        modifier_active: { type: "boolean", description: "Is active" },
      },
      required: ["modifier_name"],
    },
  },
  {
    name: "hiboutik_modifier_update",
    description: "Update a modifier",
    inputSchema: {
      type: "object",
      properties: {
        modifier_id: { type: "number", description: "Modifier ID" },
        modifier_name: { type: "string", description: "Modifier name" },
        modifier_price: { type: "number", description: "Modifier price adjustment" },
        modifier_active: { type: "boolean", description: "Is active" },
      },
      required: ["modifier_id"],
    },
  },
  {
    name: "hiboutik_modifier_delete",
    description: "Delete a modifier",
    inputSchema: {
      type: "object",
      properties: {
        modifier_id: { type: "number", description: "Modifier ID" },
      },
      required: ["modifier_id"],
    },
  },
  {
    name: "hiboutik_modifier_search",
    description: "Search modifiers by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
    },
  },
];

export async function handleModifierTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_modifier_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/modifiers/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_modifier_get": {
      const result = await hiboutikRequest(config, `/modifiers/${params.modifier_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_modifier_create": {
      const result = await hiboutikFormRequest(config, "/modifiers/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_modifier_update": {
      const result = await hiboutikFormRequest(config, `/modifiers/${params.modifier_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_modifier_delete": {
      const result = await hiboutikFormRequest(config, `/modifiers/${params.modifier_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_modifier_search": {
      const result = await hiboutikRequest(config, `/modifiers/search/${encodeURIComponent(String(params.query))}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown modifier tool: ${name}`);
  }
}
