import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerCategoryTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_category_list",
    {
      description: "List all product categories",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/categories?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_category_get",
    {
      description: "Get a category by ID",
      inputSchema: { category_id: z.number() },
    },
    async ({ category_id }) => {
      const result = await hiboutikRequest(
        config,
        `/categories/${category_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_category_create",
    {
      description: "Create a new category",
      inputSchema: {
        category_name: z.string(),
        category_parent_id: z.number().optional(),
        category_display_order: z.number().optional(),
        category_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/categories",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_category_update",
    {
      description: "Update an existing category",
      inputSchema: {
        category_id: z.number(),
        category_name: z.string().optional(),
        category_parent_id: z.number().optional(),
        category_display_order: z.number().optional(),
        category_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/categories/${params.category_id}`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_category_delete",
    {
      description: "Delete a category by ID",
      inputSchema: { category_id: z.number() },
    },
    async ({ category_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/categories/${category_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_category_search",
    {
      description: "Search categories by name",
      inputSchema: { query: z.string() },
    },
    async ({ query }) => {
      const result = await hiboutikRequest(
        config,
        `/categories/search/${encodeURIComponent(query)}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
