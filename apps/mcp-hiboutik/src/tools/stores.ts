import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const storeTools: Tool[] = [
  {
    name: "hiboutik_store_list",
    description: "List all stores/shops",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_store_get_attribute",
    description: "Get store attribute by name",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        attribute_name: { type: "string", description: "Attribute name" },
      },
      required: ["store_id", "attribute_name"],
    },
  },
  {
    name: "hiboutik_store_set_attribute",
    description: "Set store attribute value",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        attribute_name: { type: "string", description: "Attribute name" },
        attribute_value: { type: "string", description: "Attribute value" },
      },
      required: ["store_id", "attribute_name", "attribute_value"],
    },
  },
];

export async function handleStoreTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_store_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/stores?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_store_get_attribute": {
      const query = new URLSearchParams();
      query.append("store_id", String(params.store_id));
      query.append("attribute", String(params.attribute_name));
      const result = await hiboutikRequest(config, `/store/attribute/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_store_set_attribute": {
      const result = await hiboutikFormRequest(config, "/store/attribute/", "POST", {
        store_id: params.store_id,
        attribute: params.attribute_name,
        value: params.attribute_value,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown store tool: ${name}`);
  }
}
