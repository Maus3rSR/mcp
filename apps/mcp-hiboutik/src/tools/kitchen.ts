import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const kitchenTools: Tool[] = [
  {
    name: "hiboutik_kitchen_get_open_tables",
    description: "Get all open tables in kitchen display",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_kitchen_get_cooking_stations",
    description: "Get all cooking stations",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_kitchen_get_sale",
    description: "Get kitchen order details for a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_kitchen_get_line_item",
    description: "Get kitchen line item details",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
      },
      required: ["line_item_id"],
    },
  },
  {
    name: "hiboutik_kitchen_get_line_items",
    description: "Get all kitchen line items (optionally filtered)",
    inputSchema: {
      type: "object",
      properties: {
        cooking_station_id: { type: "number", description: "Filter by cooking station" },
        status: { type: "string", description: "Filter by status" },
      },
    },
  },
  {
    name: "hiboutik_kitchen_update_item_status",
    description: "Update kitchen item status",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
        status: { type: "string", description: "New status (pending, in_progress, ready, served)" },
      },
      required: ["line_item_id", "status"],
    },
  },
  {
    name: "hiboutik_kitchen_update_sale",
    description: "Update kitchen sale details",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        cooking_station_id: { type: "number", description: "Cooking station ID" },
        priority: { type: "number", description: "Priority level" },
        note: { type: "string", description: "Kitchen note" },
      },
      required: ["sale_id"],
    },
  },
];

export async function handleKitchenTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_kitchen_get_open_tables": {
      const result = await hiboutikRequest(config, "/kitchen/open_tables");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_get_cooking_stations": {
      const result = await hiboutikRequest(config, "/kitchen/cooking_stations");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_get_sale": {
      const result = await hiboutikRequest(config, `/kitchen/sales/${params.sale_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_get_line_item": {
      const result = await hiboutikRequest(config, "/kitchen/line_item", "GET", { line_item_id: params.line_item_id });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_get_line_items": {
      const query = new URLSearchParams();
      if (params.cooking_station_id) query.append("cooking_station_id", String(params.cooking_station_id));
      if (params.status) query.append("status", String(params.status));
      const result = await hiboutikRequest(config, `/kitchen/line_items?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_update_item_status": {
      const result = await hiboutikFormRequest(config, "/kitchen/item_status", "POST", {
        line_item_id: params.line_item_id,
        status: params.status,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_kitchen_update_sale": {
      const result = await hiboutikFormRequest(config, `/kitchen/sales/${params.sale_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown kitchen tool: ${name}`);
  }
}
