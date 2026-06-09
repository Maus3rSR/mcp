import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const inventoryTools: Tool[] = [
  {
    name: "hiboutik_inventory_get_inputs",
    description: "Get all inventory inputs (stock purchases)",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
        warehouse_id: { type: "number", description: "Filter by warehouse ID" },
      },
    },
  },
  {
    name: "hiboutik_inventory_get_input",
    description: "Get a specific inventory input by ID",
    inputSchema: {
      type: "object",
      properties: {
        inventory_input_id: { type: "number", description: "Inventory input ID" },
      },
      required: ["inventory_input_id"],
    },
  },
  {
    name: "hiboutik_inventory_create_input",
    description: "Create a new inventory input (stock purchase)",
    inputSchema: {
      type: "object",
      properties: {
        inventory_input_supplier: { type: "number", description: "Supplier ID" },
        inventory_input_warehouse_id: { type: "number", description: "Warehouse ID" },
        inventory_input_reference: { type: "string", description: "Reference number" },
        inventory_input_note: { type: "string", description: "Note" },
        inventory_input_date: { type: "string", description: "Date (YYYY-MM-DD)" },
      },
      required: ["inventory_input_warehouse_id"],
    },
  },
  {
    name: "hiboutik_inventory_validate_input",
    description: "Validate an inventory input (finalize stock entry)",
    inputSchema: {
      type: "object",
      properties: {
        inventory_input_id: { type: "number", description: "Inventory input ID" },
      },
      required: ["inventory_input_id"],
    },
  },
  {
    name: "hiboutik_inventory_get_transfers",
    description: "Get all stock transfers",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_inventory_create_transfer",
    description: "Create a new stock transfer",
    inputSchema: {
      type: "object",
      properties: {
        transfer_from_warehouse_id: { type: "number", description: "Source warehouse ID" },
        transfer_to_warehouse_id: { type: "number", description: "Destination warehouse ID" },
        transfer_reference: { type: "string", description: "Reference" },
        transfer_note: { type: "string", description: "Note" },
      },
      required: ["transfer_from_warehouse_id", "transfer_to_warehouse_id"],
    },
  },
  {
    name: "hiboutik_inventory_validate_transfer",
    description: "Validate a stock transfer",
    inputSchema: {
      type: "object",
      properties: {
        stock_transfer_id: { type: "number", description: "Transfer ID" },
      },
      required: ["stock_transfer_id"],
    },
  },
  {
    name: "hiboutik_inventory_get_counts",
    description: "Get inventory counts (stock takes)",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_inventory_create_count",
    description: "Create a new inventory count (stock take)",
    inputSchema: {
      type: "object",
      properties: {
        warehouse_id: { type: "number", description: "Warehouse ID" },
        inventory_count_reference: { type: "string", description: "Reference" },
        inventory_count_note: { type: "string", description: "Note" },
      },
      required: ["warehouse_id"],
    },
  },
  {
    name: "hiboutik_inventory_close_count",
    description: "Close an inventory count (apply corrections)",
    inputSchema: {
      type: "object",
      properties: {
        inventory_count_id: { type: "number", description: "Count ID" },
      },
      required: ["inventory_count_id"],
    },
  },
];

export async function handleInventoryTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_inventory_get_inputs": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/inventory_inputs/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_get_input": {
      const result = await hiboutikRequest(config, `/inventory_inputs/${params.inventory_input_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_create_input": {
      const result = await hiboutikFormRequest(config, "/inventory_inputs/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_validate_input": {
      const result = await hiboutikFormRequest(config, "/inventory_input_validate/", "POST", { inventory_input_id: params.inventory_input_id });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_get_transfers": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/stock_transfer/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_create_transfer": {
      const result = await hiboutikFormRequest(config, "/stock_transfer/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_validate_transfer": {
      const result = await hiboutikFormRequest(config, "/stock_transfer_validate/", "POST", { stock_transfer_id: params.stock_transfer_id });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_get_counts": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/inventory_counts/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_create_count": {
      const result = await hiboutikFormRequest(config, "/inventory_counts/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_inventory_close_count": {
      const result = await hiboutikFormRequest(config, "/inventory_close/", "POST", { inventory_count_id: params.inventory_count_id });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown inventory tool: ${name}`);
  }
}
