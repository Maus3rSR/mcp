import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerTimeTrackingTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_time_tracking_check_in",
    {
      description: "Check in for time tracking",
      inputSchema: {
        store_id: z.number(),
        user_id: z.number().optional(),
        customer_id: z.number().optional(),
        check_in_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/time_tracking/check_in", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_time_tracking_check_out",
    {
      description: "Check out for time tracking",
      inputSchema: {
        time_tracking_id: z.number(),
        check_out_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/time_tracking/check_out", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_time_tracking_get",
    {
      description: "Get time tracking entry by ID",
      inputSchema: {
        time_tracking_id: z.number(),
      },
    },
    async ({ time_tracking_id }) => {
      const result = await hiboutikRequest(config, `/time_tracking/${time_tracking_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_time_tracking_get_by_date",
    {
      description: "Get time tracking entries for a specific date",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(
        config,
        `/time_tracking_date/${store_id}/${year}/${month}/${day}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_time_tracking_get_by_sale",
    {
      description: "Get time tracking entry linked to a sale",
      inputSchema: {
        sale_id: z.number(),
      },
    },
    async ({ sale_id }) => {
      const result = await hiboutikRequest(config, `/time_tracking_sale/${sale_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
