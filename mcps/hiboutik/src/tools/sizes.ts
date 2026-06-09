import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerSizeTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_size_type_list",
    {
      description: "List all size types (e.g., Clothing, Shoes)",
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
        `/size_types?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_type_create",
    {
      description: "Create a new size type",
      inputSchema: {
        size_type_name: z.string(),
      },
    },
    async ({ size_type_name }) => {
      const result = await hiboutikFormRequest(
        config,
        "/size_types/",
        "POST",
        { size_type_name },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_type_update",
    {
      description: "Update a size type",
      inputSchema: {
        size_type_id: z.number(),
        size_type_name: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/size_types/${params.size_type_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_list",
    {
      description: "List all sizes for a size type",
      inputSchema: {
        size_type_id: z.number(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async (params) => {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(
        config,
        `/sizes/${params.size_type_id}?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_create",
    {
      description: "Create a new size",
      inputSchema: {
        size_type_id: z.number(),
        size_name: z.string(),
        size_order: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sizes/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_update",
    {
      description: "Update a size",
      inputSchema: {
        size_id: z.number(),
        size_name: z.string().optional(),
        size_order: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/sizes/${params.size_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_delete",
    {
      description: "Delete a size",
      inputSchema: {
        size_id: z.number(),
      },
    },
    async ({ size_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sizes/${size_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_list_pretty",
    {
      description: "List all sizes with formatted names",
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
        `/sizes_pretty/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_size_get_specific_rules",
    {
      description: "Get size-specific rules",
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
        `/sizes_specific_rules?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
