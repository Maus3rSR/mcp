import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest } from "../api/client.js";

export function registerSearchTools(server: McpServer, config: HiboutikConfig) {
  server.registerTool(
    "hiboutik_search_customers",
    {
      description: "Search customers by name, email, phone",
      inputSchema: {
        query: z.string(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ query, page, limit }) => {
      const searchQuery = new URLSearchParams();
      searchQuery.append("q", query);
      if (page) searchQuery.append("page", String(page));
      if (limit) searchQuery.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/customers/search/?${searchQuery.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_search_customers_by_tag",
    {
      description: "Search customers by tag",
      inputSchema: {
        tag_id: z.number(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ tag_id, page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/customers/search/tags/${tag_id}?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_search_stock_transfers",
    {
      description: "Search stock transfers",
      inputSchema: {
        query: z.string(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ query, page, limit }) => {
      const searchQuery = new URLSearchParams();
      searchQuery.append("q", query);
      if (page) searchQuery.append("page", String(page));
      if (limit) searchQuery.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/stock_transfer/search/?${searchQuery.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_search_products",
    {
      description: "Advanced product search",
      inputSchema: {
        query: z.string().optional(),
        category_id: z.number().optional(),
        brand_id: z.number().optional(),
        supplier_id: z.number().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ query, category_id, brand_id, supplier_id, page, limit }) => {
      const searchQuery = new URLSearchParams();
      if (query) searchQuery.append("q", query);
      if (category_id) searchQuery.append("category_id", String(category_id));
      if (brand_id) searchQuery.append("brand_id", String(brand_id));
      if (supplier_id) searchQuery.append("supplier_id", String(supplier_id));
      if (page) searchQuery.append("page", String(page));
      if (limit) searchQuery.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/products/search/?${searchQuery.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
