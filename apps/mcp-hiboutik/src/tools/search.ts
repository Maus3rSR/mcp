import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest } from "../api/client.js";

export const searchTools: Tool[] = [
  {
    name: "hiboutik_search_customers",
    description: "Search customers by name, email, phone",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["query"],
    },
  },
  {
    name: "hiboutik_search_customers_by_tag",
    description: "Search customers by tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "hiboutik_search_stock_transfers",
    description: "Search stock transfers",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["query"],
    },
  },
  {
    name: "hiboutik_search_products",
    description: "Advanced product search",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        category_id: { type: "number", description: "Filter by category" },
        brand_id: { type: "number", description: "Filter by brand" },
        supplier_id: { type: "number", description: "Filter by supplier" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
];

export async function handleSearchTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_search_customers": {
      const query = new URLSearchParams();
      query.append("q", String(params.query));
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/customers/search/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_search_customers_by_tag": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/customers/search/tags/${params.tag_id}?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_search_stock_transfers": {
      const query = new URLSearchParams();
      query.append("q", String(params.query));
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/stock_transfer/search/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_search_products": {
      const query = new URLSearchParams();
      if (params.query) query.append("q", String(params.query));
      if (params.category_id) query.append("category_id", String(params.category_id));
      if (params.brand_id) query.append("brand_id", String(params.brand_id));
      if (params.supplier_id) query.append("supplier_id", String(params.supplier_id));
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/products/search/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown search tool: ${name}`);
  }
}
