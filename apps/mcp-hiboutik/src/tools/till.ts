import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const tillTools: Tool[] = [
  {
    name: "hiboutik_till_get",
    description: "Get till/cash register data for a store and date",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_till_cash_in",
    description: "Add cash to till (cash in)",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        amount: { type: "number", description: "Amount to add" },
        note: { type: "string", description: "Note/reason" },
      },
      required: ["store_id", "amount"],
    },
  },
  {
    name: "hiboutik_till_cash_out",
    description: "Remove cash from till (cash out)",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        amount: { type: "number", description: "Amount to remove" },
        note: { type: "string", description: "Note/reason" },
      },
      required: ["store_id", "amount"],
    },
  },
];

export async function handleTillTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_till_get": {
      const result = await hiboutikRequest(config, `/till/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_till_cash_in": {
      const result = await hiboutikFormRequest(config, "/till/cash_in", "POST", {
        store_id: params.store_id,
        cash_in_amount: params.amount,
        cash_in_note: params.note,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_till_cash_out": {
      const result = await hiboutikFormRequest(config, "/till/cash_out", "POST", {
        store_id: params.store_id,
        cash_out_amount: params.amount,
        cash_out_note: params.note,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown till tool: ${name}`);
  }
}
