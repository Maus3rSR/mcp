import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerModifierTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_modifier_list",
    {
      description: "List all product modifiers",
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
        `/modifiers/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_modifier_get",
    {
      description: "Get a modifier by ID",
      inputSchema: { modifier_id: z.number() },
    },
    async ({ modifier_id }) => {
      const result = await hiboutikRequest(
        config,
        `/modifiers/${modifier_id}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_modifier_create",
    {
      description: "Create a new modifier",
      inputSchema: {
        modifier_name: z.string(),
        modifier_price: z.number().optional(),
        modifier_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/modifiers/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_modifier_update",
    {
      description: "Update a modifier",
      inputSchema: {
        modifier_id: z.number(),
        modifier_name: z.string().optional(),
        modifier_price: z.number().optional(),
        modifier_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/modifiers/${params.modifier_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_modifier_delete",
    {
      description: "Delete a modifier",
      inputSchema: { modifier_id: z.number() },
    },
    async ({ modifier_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/modifiers/${modifier_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_modifier_search",
    {
      description: "Search modifiers by name",
      inputSchema: { query: z.string() },
    },
    async ({ query }) => {
      const result = await hiboutikRequest(
        config,
        `/modifiers/search/${encodeURIComponent(query)}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
