import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const brandTools: Tool[] = [
  {
    name: "hiboutik_brand_list",
    description: "List all product brands",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_brand_get",
    description: "Get a brand by ID",
    inputSchema: {
      type: "object",
      properties: {
        brand_id: { type: "number", description: "Brand ID" },
      },
      required: ["brand_id"],
    },
  },
  {
    name: "hiboutik_brand_create",
    description: "Create a new brand",
    inputSchema: {
      type: "object",
      properties: {
        brand_name: { type: "string", description: "Brand name" },
        brand_display_order: { type: "number", description: "Display order" },
        brand_active: { type: "boolean", description: "Is brand active" },
      },
      required: ["brand_name"],
    },
  },
  {
    name: "hiboutik_brand_update",
    description: "Update an existing brand",
    inputSchema: {
      type: "object",
      properties: {
        brand_id: { type: "number", description: "Brand ID" },
        brand_name: { type: "string", description: "Brand name" },
        brand_display_order: { type: "number", description: "Display order" },
        brand_active: { type: "boolean", description: "Is brand active" },
      },
      required: ["brand_id"],
    },
  },
  {
    name: "hiboutik_brand_delete",
    description: "Delete a brand by ID",
    inputSchema: {
      type: "object",
      properties: {
        brand_id: { type: "number", description: "Brand ID" },
      },
      required: ["brand_id"],
    },
  },
];

export async function handleBrandTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_brand_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/brands?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_brand_get": {
      const result = await hiboutikRequest(config, `/brands/${params.brand_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_brand_create": {
      const result = await hiboutikFormRequest(config, "/brands", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_brand_update": {
      const result = await hiboutikFormRequest(config, `/brands/${params.brand_id}`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_brand_delete": {
      const result = await hiboutikFormRequest(config, `/brands/${params.brand_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown brand tool: ${name}`);
  }
}
