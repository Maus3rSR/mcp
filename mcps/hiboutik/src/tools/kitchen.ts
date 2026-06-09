import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerKitchenTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_kitchen_get_open_tables",
    { description: "Get all open tables in kitchen display" },
    async () => {
      const result = await hiboutikRequest(config, "/kitchen/open_tables");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_get_cooking_stations",
    { description: "Get all cooking stations" },
    async () => {
      const result = await hiboutikRequest(config, "/kitchen/cooking_stations");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_get_sale",
    {
      description: "Get kitchen order details for a sale",
      inputSchema: { sale_id: z.number() },
    },
    async ({ sale_id }) => {
      const result = await hiboutikRequest(config, `/kitchen/sales/${sale_id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_get_line_item",
    {
      description: "Get kitchen line item details",
      inputSchema: { line_item_id: z.number() },
    },
    async ({ line_item_id }) => {
      const result = await hiboutikRequest(
        config,
        "/kitchen/line_item",
        "GET",
        { line_item_id },
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_get_line_items",
    {
      description: "Get all kitchen line items (optionally filtered)",
      inputSchema: {
        cooking_station_id: z.number().optional(),
        status: z.string().optional(),
      },
    },
    async ({ cooking_station_id, status }) => {
      const query = new URLSearchParams();
      if (cooking_station_id)
        query.append("cooking_station_id", String(cooking_station_id));
      if (status) query.append("status", String(status));
      const result = await hiboutikRequest(
        config,
        `/kitchen/line_items?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_update_item_status",
    {
      description: "Update kitchen item status",
      inputSchema: {
        line_item_id: z.number(),
        status: z.string(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/kitchen/item_status",
        "POST",
        {
          line_item_id: params.line_item_id,
          status: params.status,
        },
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_kitchen_update_sale",
    {
      description: "Update kitchen sale details",
      inputSchema: {
        sale_id: z.number(),
        cooking_station_id: z.number().optional(),
        priority: z.number().optional(),
        note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/kitchen/sales/${params.sale_id}/`,
        "PUT",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
