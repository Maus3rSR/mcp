import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerStockTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_stock_get_available",
    {
      description: "Get available stock for a warehouse",
      inputSchema: {
        warehouse_id: z.number(),
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ warehouse_id, page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/stock_available/warehouse_id/${warehouse_id}?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_available_all",
    {
      description: "Get available stock from all warehouses",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/stock_available/all_wh?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_by_product",
    {
      description: "Get stock for a specific product across all warehouses",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/stock_available/product_id/${product_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_by_product_size",
    {
      description: "Get stock for a specific product and size",
      inputSchema: {
        product_id: z.number(),
        product_size: z.number(),
      },
    },
    async ({ product_id, product_size }) => {
      const result = await hiboutikRequest(
        config,
        `/stock_available/product_id_size/${product_id}/${product_size}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_by_serial_number",
    {
      description: "Get stock item by serial number",
      inputSchema: {
        product_id: z.number(),
        product_size: z.number(),
        serial_number: z.string(),
      },
    },
    async ({ product_id, product_size, serial_number }) => {
      const query = new URLSearchParams();
      query.append("sn", String(serial_number));
      const result = await hiboutikRequest(
        config,
        `/stock_available/sn/${product_id}/${product_size}?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_alerts",
    {
      description: "Get all stock alerts (low stock, out of stock)",
      inputSchema: {
        warehouse_id: z.number().optional(),
      },
    },
    async ({ warehouse_id }) => {
      const query = new URLSearchParams();
      if (warehouse_id) query.append("warehouse_id", String(warehouse_id));
      const result = await hiboutikRequest(
        config,
        `/stock_alert/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_reset_alerts",
    { description: "Reset/recalculate all stock alerts" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/reset_stock_alerts/",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_active_sizes",
    {
      description: "Get active sizes for a product",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/active_sizes/${product_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_get_all_active_sizes",
    {
      description: "Get all active sizes across products",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/active_sizes/all/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_build_from_available",
    { description: "Build active sizes from stock available" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/active_sizes/build_from_stock_available",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_build_from_available_and_alerts",
    { description: "Build active sizes from stock available and alerts" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/active_sizes/build_from_stock_available_and_alerts",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_build_from_inventory_and_sales",
    { description: "Build active sizes from inventory inputs and sales" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/active_sizes/build_from_inventory_inputs_and_sales",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_build_from_barcode_rules",
    { description: "Build active sizes from barcode rules" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/active_sizes/build_from_barcode_rules",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_add_active_size",
    {
      description: "Add an active size to a product",
      inputSchema: {
        product_id: z.number(),
        size_id: z.number(),
        stock_alert_level: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/active_sizes/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_remove_active_size",
    {
      description: "Remove an active size from a product",
      inputSchema: {
        product_id: z.number(),
        size_id: z.number(),
      },
    },
    async ({ product_id, size_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/active_sizes/${product_id}/${size_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_stock_update_active_size",
    {
      description: "Update an active size for a product",
      inputSchema: {
        product_id: z.number(),
        size_id: z.number(),
        stock_alert_level: z.number().optional(),
        active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/active_sizes/${params.product_id}/${params.size_id}`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
