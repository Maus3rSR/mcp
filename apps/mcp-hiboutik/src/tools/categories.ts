import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const categoryTools: Tool[] = [
  {
    name: "hiboutik_category_list",
    description: "List all product categories",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_category_get",
    description: "Get a category by ID",
    inputSchema: {
      type: "object",
      properties: {
        category_id: { type: "number", description: "Category ID" },
      },
      required: ["category_id"],
    },
  },
  {
    name: "hiboutik_category_create",
    description: "Create a new category",
    inputSchema: {
      type: "object",
      properties: {
        category_name: { type: "string", description: "Category name" },
        category_parent_id: { type: "number", description: "Parent category ID (for subcategories)" },
        category_display_order: { type: "number", description: "Display order" },
        category_active: { type: "boolean", description: "Is category active" },
      },
      required: ["category_name"],
    },
  },
  {
    name: "hiboutik_category_update",
    description: "Update an existing category",
    inputSchema: {
      type: "object",
      properties: {
        category_id: { type: "number", description: "Category ID" },
        category_name: { type: "string", description: "Category name" },
        category_parent_id: { type: "number", description: "Parent category ID" },
        category_display_order: { type: "number", description: "Display order" },
        category_active: { type: "boolean", description: "Is category active" },
      },
      required: ["category_id"],
    },
  },
  {
    name: "hiboutik_category_delete",
    description: "Delete a category by ID",
    inputSchema: {
      type: "object",
      properties: {
        category_id: { type: "number", description: "Category ID" },
      },
      required: ["category_id"],
    },
  },
  {
    name: "hiboutik_category_search",
    description: "Search categories by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
    },
  },
];

export async function handleCategoryTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_category_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/categories?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_category_get": {
      const result = await hiboutikRequest(config, `/categories/${params.category_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_category_create": {
      const result = await hiboutikFormRequest(config, "/categories", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_category_update": {
      const result = await hiboutikFormRequest(config, `/categories/${params.category_id}`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_category_delete": {
      const result = await hiboutikFormRequest(config, `/categories/${params.category_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_category_search": {
      const result = await hiboutikRequest(config, `/categories/search/${encodeURIComponent(String(params.query))}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown category tool: ${name}`);
  }
}
