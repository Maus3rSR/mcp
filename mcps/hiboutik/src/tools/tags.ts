import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerTagTools(server: McpServer, config: HiboutikConfig) {
  server.registerTool(
    "hiboutik_tag_list_customers",
    {
      description: "List all customer tags",
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
        `/tags/customers/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_list_products",
    {
      description: "List all product tags",
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
        `/tags/products/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_list_sales",
    {
      description: "List all sale tags",
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
        `/tags/sales/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_get",
    {
      description: "Get a tag by ID",
      inputSchema: {
        tag_id: z.number(),
        tag_type: z.string(),
      },
    },
    async ({ tag_id, tag_type }) => {
      const result = await hiboutikRequest(
        config,
        `/tags/${tag_type}/${tag_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_create",
    {
      description: "Create a new tag",
      inputSchema: {
        tag_type: z.string(),
        tag_name: z.string(),
        tag_color: z.string().optional(),
      },
    },
    async ({ tag_type, tag_name, tag_color }) => {
      const result = await hiboutikFormRequest(
        config,
        `/tags/${tag_type}/`,
        "POST",
        {
          tag_name,
          tag_color,
        },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_update",
    {
      description: "Update an existing tag",
      inputSchema: {
        tag_id: z.number(),
        tag_type: z.string(),
        tag_name: z.string().optional(),
        tag_color: z.string().optional(),
      },
    },
    async ({ tag_id, tag_type, tag_name, tag_color }) => {
      const result = await hiboutikFormRequest(
        config,
        `/tags/${tag_type}/${tag_id}`,
        "PUT",
        {
          tag_name,
          tag_color,
        },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_tag_delete",
    {
      description: "Delete a tag by ID",
      inputSchema: {
        tag_id: z.number(),
        tag_type: z.string(),
      },
    },
    async ({ tag_id, tag_type }) => {
      const result = await hiboutikFormRequest(
        config,
        `/tags/${tag_type}/${tag_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
