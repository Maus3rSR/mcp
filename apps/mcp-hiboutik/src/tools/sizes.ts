import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const sizeTools: Tool[] = [
  {
    name: "hiboutik_size_type_list",
    description: "List all size types (e.g., Clothing, Shoes)",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_size_type_create",
    description: "Create a new size type",
    inputSchema: {
      type: "object",
      properties: {
        size_type_name: { type: "string", description: "Size type name" },
      },
      required: ["size_type_name"],
    },
  },
  {
    name: "hiboutik_size_type_update",
    description: "Update a size type",
    inputSchema: {
      type: "object",
      properties: {
        size_type_id: { type: "number", description: "Size type ID" },
        size_type_name: { type: "string", description: "Size type name" },
      },
      required: ["size_type_id"],
    },
  },
  {
    name: "hiboutik_size_list",
    description: "List all sizes for a size type",
    inputSchema: {
      type: "object",
      properties: {
        size_type_id: { type: "number", description: "Size type ID" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["size_type_id"],
    },
  },
  {
    name: "hiboutik_size_create",
    description: "Create a new size",
    inputSchema: {
      type: "object",
      properties: {
        size_type_id: { type: "number", description: "Size type ID" },
        size_name: { type: "string", description: "Size name" },
        size_order: { type: "number", description: "Display order" },
      },
      required: ["size_type_id", "size_name"],
    },
  },
  {
    name: "hiboutik_size_update",
    description: "Update a size",
    inputSchema: {
      type: "object",
      properties: {
        size_id: { type: "number", description: "Size ID" },
        size_name: { type: "string", description: "Size name" },
        size_order: { type: "number", description: "Display order" },
      },
      required: ["size_id"],
    },
  },
  {
    name: "hiboutik_size_delete",
    description: "Delete a size",
    inputSchema: {
      type: "object",
      properties: {
        size_id: { type: "number", description: "Size ID" },
      },
      required: ["size_id"],
    },
  },
  {
    name: "hiboutik_size_list_pretty",
    description: "List all sizes with formatted names",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_size_get_specific_rules",
    description: "Get size-specific rules",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
];

export async function handleSizeTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_size_type_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/size_types?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_type_create": {
      const result = await hiboutikFormRequest(config, "/size_types/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_type_update": {
      const result = await hiboutikFormRequest(config, `/size_types/${params.size_type_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/sizes/${params.size_type_id}?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_create": {
      const result = await hiboutikFormRequest(config, "/sizes/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_update": {
      const result = await hiboutikFormRequest(config, `/sizes/${params.size_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_delete": {
      const result = await hiboutikFormRequest(config, `/sizes/${params.size_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_list_pretty": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/sizes_pretty/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_size_get_specific_rules": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/sizes_specific_rules?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown size tool: ${name}`);
  }
}
