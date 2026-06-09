import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerInventoryTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_inventory_get_inputs",
    {
      description: "Get all inventory inputs (stock purchases)",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
        warehouse_id: z.number().optional(),
      },
    },
    async ({ page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/inventory_inputs/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_get_input",
    {
      description: "Get a specific inventory input by ID",
      inputSchema: { inventory_input_id: z.number() },
    },
    async ({ inventory_input_id }) => {
      const result = await hiboutikRequest(
        config,
        `/inventory_inputs/${inventory_input_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_create_input",
    {
      description: "Create a new inventory input (stock purchase)",
      inputSchema: {
        inventory_input_supplier: z.number().optional(),
        inventory_input_warehouse_id: z.number(),
        inventory_input_reference: z.string().optional(),
        inventory_input_note: z.string().optional(),
        inventory_input_date: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/inventory_inputs/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_validate_input",
    {
      description: "Validate an inventory input (finalize stock entry)",
      inputSchema: { inventory_input_id: z.number() },
    },
    async ({ inventory_input_id }) => {
      const result = await hiboutikFormRequest(
        config,
        "/inventory_input_validate/",
        "POST",
        { inventory_input_id },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_get_transfers",
    {
      description: "Get all stock transfers",
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
        `/stock_transfer/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_create_transfer",
    {
      description: "Create a new stock transfer",
      inputSchema: {
        transfer_from_warehouse_id: z.number(),
        transfer_to_warehouse_id: z.number(),
        transfer_reference: z.string().optional(),
        transfer_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/stock_transfer/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_validate_transfer",
    {
      description: "Validate a stock transfer",
      inputSchema: { stock_transfer_id: z.number() },
    },
    async ({ stock_transfer_id }) => {
      const result = await hiboutikFormRequest(
        config,
        "/stock_transfer_validate/",
        "POST",
        { stock_transfer_id },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_get_counts",
    {
      description: "Get inventory counts (stock takes)",
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
        `/inventory_counts/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_create_count",
    {
      description: "Create a new inventory count (stock take)",
      inputSchema: {
        warehouse_id: z.number(),
        inventory_count_reference: z.string().optional(),
        inventory_count_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/inventory_counts/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_inventory_close_count",
    {
      description: "Close an inventory count (apply corrections)",
      inputSchema: { inventory_count_id: z.number() },
    },
    async ({ inventory_count_id }) => {
      const result = await hiboutikFormRequest(
        config,
        "/inventory_close/",
        "POST",
        { inventory_count_id },
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
