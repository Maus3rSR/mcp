import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const stockTools: Tool[] = [
  {
    name: "hiboutik_stock_get_available",
    description: "Get available stock for a warehouse",
    inputSchema: {
      type: "object",
      properties: {
        warehouse_id: { type: "number", description: "Warehouse ID" },
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
      required: ["warehouse_id"],
    },
  },
  {
    name: "hiboutik_stock_get_available_all",
    description: "Get available stock from all warehouses",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_stock_get_by_product",
    description: "Get stock for a specific product across all warehouses",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_stock_get_by_product_size",
    description: "Get stock for a specific product and size",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        product_size: { type: "number", description: "Size ID" },
      },
      required: ["product_id", "product_size"],
    },
  },
  {
    name: "hiboutik_stock_get_by_serial_number",
    description: "Get stock item by serial number",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        product_size: { type: "number", description: "Size ID" },
        serial_number: { type: "string", description: "Serial number" },
      },
      required: ["product_id", "product_size", "serial_number"],
    },
  },
  {
    name: "hiboutik_stock_get_alerts",
    description: "Get all stock alerts (low stock, out of stock)",
    inputSchema: {
      type: "object",
      properties: {
        warehouse_id: { type: "number", description: "Filter by warehouse ID" },
      },
    },
  },
  {
    name: "hiboutik_stock_reset_alerts",
    description: "Reset/recalculate all stock alerts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_stock_get_active_sizes",
    description: "Get active sizes for a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_stock_get_all_active_sizes",
    description: "Get all active sizes across products",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_stock_build_from_available",
    description: "Build active sizes from stock available",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_stock_build_from_available_and_alerts",
    description: "Build active sizes from stock available and alerts",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_stock_build_from_inventory_and_sales",
    description: "Build active sizes from inventory inputs and sales",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_stock_build_from_barcode_rules",
    description: "Build active sizes from barcode rules",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_stock_add_active_size",
    description: "Add an active size to a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID" },
        stock_alert_level: { type: "number", description: "Stock alert threshold" },
      },
      required: ["product_id", "size_id"],
    },
  },
  {
    name: "hiboutik_stock_remove_active_size",
    description: "Remove an active size from a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID" },
      },
      required: ["product_id", "size_id"],
    },
  },
  {
    name: "hiboutik_stock_update_active_size",
    description: "Update an active size for a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID" },
        stock_alert_level: { type: "number", description: "Stock alert threshold" },
        active: { type: "boolean", description: "Is active" },
      },
      required: ["product_id", "size_id"],
    },
  },
];

export async function handleStockTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_stock_get_available": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/stock_available/warehouse_id/${params.warehouse_id}?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_available_all": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/stock_available/all_wh?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_by_product": {
      const result = await hiboutikRequest(config, `/stock_available/product_id/${params.product_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_by_product_size": {
      const result = await hiboutikRequest(config, `/stock_available/product_id_size/${params.product_id}/${params.product_size}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_by_serial_number": {
      const query = new URLSearchParams();
      query.append("sn", String(params.serial_number));
      const result = await hiboutikRequest(config, `/stock_available/sn/${params.product_id}/${params.product_size}?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_alerts": {
      const query = new URLSearchParams();
      if (params.warehouse_id) query.append("warehouse_id", String(params.warehouse_id));
      const result = await hiboutikRequest(config, `/stock_alert/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_reset_alerts": {
      const result = await hiboutikFormRequest(config, "/reset_stock_alerts/", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_active_sizes": {
      const result = await hiboutikRequest(config, `/active_sizes/${params.product_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_get_all_active_sizes": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/active_sizes/all/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_build_from_available": {
      const result = await hiboutikFormRequest(config, "/active_sizes/build_from_stock_available", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_build_from_available_and_alerts": {
      const result = await hiboutikFormRequest(config, "/active_sizes/build_from_stock_available_and_alerts", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_build_from_inventory_and_sales": {
      const result = await hiboutikFormRequest(config, "/active_sizes/build_from_inventory_inputs_and_sales", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_build_from_barcode_rules": {
      const result = await hiboutikFormRequest(config, "/active_sizes/build_from_barcode_rules", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_add_active_size": {
      const result = await hiboutikFormRequest(config, "/active_sizes/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_remove_active_size": {
      const result = await hiboutikFormRequest(config, `/active_sizes/${params.product_id}/${params.size_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_stock_update_active_size": {
      const result = await hiboutikFormRequest(config, `/active_sizes/${params.product_id}/${params.size_id}`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown stock tool: ${name}`);
  }
}
