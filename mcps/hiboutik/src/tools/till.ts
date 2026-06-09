import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerTillTools(server: McpServer, config: HiboutikConfig) {
  server.registerTool(
    "hiboutik_till_get",
    {
      description: "Get till/cash register data for a store and date",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/till/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_till_cash_in",
    {
      description: "Add cash to till (cash in)",
      inputSchema: {
        store_id: z.number(),
        amount: z.number(),
        note: z.string().optional(),
      },
    },
    async ({ store_id, amount, note }) => {
      const result = await hiboutikFormRequest(config, "/till/cash_in", "POST", {
        store_id,
        cash_in_amount: amount,
        cash_in_note: note,
      });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_till_cash_out",
    {
      description: "Remove cash from till (cash out)",
      inputSchema: {
        store_id: z.number(),
        amount: z.number(),
        note: z.string().optional(),
      },
    },
    async ({ store_id, amount, note }) => {
      const result = await hiboutikFormRequest(
        config,
        "/till/cash_out",
        "POST",
        {
          store_id,
          cash_out_amount: amount,
          cash_out_note: note,
        },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
