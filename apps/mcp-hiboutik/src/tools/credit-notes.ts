import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest } from "../api/client.js";

export const creditNoteTools: Tool[] = [
  {
    name: "hiboutik_credit_note_list",
    description: "List all credit notes for a store",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["store_id"],
    },
  },
];

export async function handleCreditNoteTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_credit_note_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/credit_notes/${params.store_id}?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown credit note tool: ${name}`);
  }
}
