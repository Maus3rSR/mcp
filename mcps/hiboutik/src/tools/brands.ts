import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerBrandTools(server: McpServer, config: HiboutikConfig) {
  server.registerTool(
    "hiboutik_brand_list",
    {
      description: "List all product brands",
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
        `/brands?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_brand_get",
    {
      description: "Get a brand by ID",
      inputSchema: { brand_id: z.number() },
    },
    async ({ brand_id }) => {
      const result = await hiboutikRequest(config, `/brands/${brand_id}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_brand_create",
    {
      description: "Create a new brand",
      inputSchema: {
        brand_name: z.string(),
        brand_display_order: z.number().optional(),
        brand_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/brands",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_brand_update",
    {
      description: "Update an existing brand",
      inputSchema: {
        brand_id: z.number(),
        brand_name: z.string().optional(),
        brand_display_order: z.number().optional(),
        brand_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/brands/${params.brand_id}`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_brand_delete",
    {
      description: "Delete a brand by ID",
      inputSchema: { brand_id: z.number() },
    },
    async ({ brand_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/brands/${brand_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
