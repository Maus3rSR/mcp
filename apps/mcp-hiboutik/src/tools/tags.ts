import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const tagTools: Tool[] = [
  {
    name: "hiboutik_tag_list_customers",
    description: "List all customer tags",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_tag_list_products",
    description: "List all product tags",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_tag_list_sales",
    description: "List all sale tags",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_tag_get",
    description: "Get a tag by ID",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        tag_type: { type: "string", description: "Tag type (customers, products, sales)" },
      },
      required: ["tag_id", "tag_type"],
    },
  },
  {
    name: "hiboutik_tag_create",
    description: "Create a new tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_type: { type: "string", description: "Tag type (customers, products, sales)" },
        tag_name: { type: "string", description: "Tag name" },
        tag_color: { type: "string", description: "Tag color (hex)" },
      },
      required: ["tag_type", "tag_name"],
    },
  },
  {
    name: "hiboutik_tag_update",
    description: "Update an existing tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        tag_type: { type: "string", description: "Tag type (customers, products, sales)" },
        tag_name: { type: "string", description: "Tag name" },
        tag_color: { type: "string", description: "Tag color (hex)" },
      },
      required: ["tag_id", "tag_type"],
    },
  },
  {
    name: "hiboutik_tag_delete",
    description: "Delete a tag by ID",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        tag_type: { type: "string", description: "Tag type (customers, products, sales)" },
      },
      required: ["tag_id", "tag_type"],
    },
  },
];

export async function handleTagTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_tag_list_customers": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/tags/customers/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_list_products": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/tags/products/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_list_sales": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/tags/sales/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_get": {
      const result = await hiboutikRequest(config, `/tags/${params.tag_type}/${params.tag_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_create": {
      const result = await hiboutikFormRequest(config, `/tags/${params.tag_type}/`, "POST", {
        tag_name: params.tag_name,
        tag_color: params.tag_color,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_update": {
      const result = await hiboutikFormRequest(config, `/tags/${params.tag_type}/${params.tag_id}`, "PUT", {
        tag_name: params.tag_name,
        tag_color: params.tag_color,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_tag_delete": {
      const result = await hiboutikFormRequest(config, `/tags/${params.tag_type}/${params.tag_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown tag tool: ${name}`);
  }
}
