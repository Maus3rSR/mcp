import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest } from "../api/client.js";

export function registerCreditNoteTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_credit_note_list",
    {
      description: "List all credit notes for a store",
      inputSchema: {
        store_id: z.number(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ store_id, page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/credit_notes/${store_id}?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
