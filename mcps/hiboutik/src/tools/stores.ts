import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerStoreTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_store_list",
    {
      description: "List all stores/shops",
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
        `/stores?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_store_get_attribute",
    {
      description: "Get store attribute by name",
      inputSchema: {
        store_id: z.number(),
        attribute_name: z.string(),
      },
    },
    async ({ store_id, attribute_name }) => {
      const query = new URLSearchParams();
      query.append("store_id", String(store_id));
      query.append("attribute", String(attribute_name));
      const result = await hiboutikRequest(
        config,
        `/store/attribute/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_store_set_attribute",
    {
      description: "Set store attribute value",
      inputSchema: {
        store_id: z.number(),
        attribute_name: z.string(),
        attribute_value: z.string(),
      },
    },
    async ({ store_id, attribute_name, attribute_value }) => {
      const result = await hiboutikFormRequest(
        config,
        "/store/attribute/",
        "POST",
        {
          store_id,
          attribute: attribute_name,
          value: attribute_value,
        },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
