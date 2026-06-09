import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const timeTrackingTools: Tool[] = [
  {
    name: "hiboutik_time_tracking_check_in",
    description: "Check in for time tracking",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        user_id: { type: "number", description: "User ID (optional, defaults to current user)" },
        customer_id: { type: "number", description: "Customer ID (for customer time tracking)" },
        check_in_note: { type: "string", description: "Check-in note" },
      },
      required: ["store_id"],
    },
  },
  {
    name: "hiboutik_time_tracking_check_out",
    description: "Check out for time tracking",
    inputSchema: {
      type: "object",
      properties: {
        time_tracking_id: { type: "number", description: "Time tracking entry ID" },
        check_out_note: { type: "string", description: "Check-out note" },
      },
      required: ["time_tracking_id"],
    },
  },
  {
    name: "hiboutik_time_tracking_get",
    description: "Get time tracking entry by ID",
    inputSchema: {
      type: "object",
      properties: {
        time_tracking_id: { type: "number", description: "Time tracking entry ID" },
      },
      required: ["time_tracking_id"],
    },
  },
  {
    name: "hiboutik_time_tracking_get_by_date",
    description: "Get time tracking entries for a specific date",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day" },
      },
      required: ["store_id", "year", "month", "day"],
    },
  },
  {
    name: "hiboutik_time_tracking_get_by_sale",
    description: "Get time tracking entry linked to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
      },
      required: ["sale_id"],
    },
  },
];

export async function handleTimeTrackingTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_time_tracking_check_in": {
      const result = await hiboutikFormRequest(config, "/time_tracking/check_in", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_time_tracking_check_out": {
      const result = await hiboutikFormRequest(config, "/time_tracking/check_out", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_time_tracking_get": {
      const result = await hiboutikRequest(config, `/time_tracking/${params.time_tracking_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_time_tracking_get_by_date": {
      const result = await hiboutikRequest(config, `/time_tracking_date/${params.store_id}/${params.year}/${params.month}/${params.day}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_time_tracking_get_by_sale": {
      const result = await hiboutikRequest(config, `/time_tracking_sale/${params.sale_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown time tracking tool: ${name}`);
  }
}
