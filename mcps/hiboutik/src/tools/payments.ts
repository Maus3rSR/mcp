import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerPaymentTools(server: McpServer, config: HiboutikConfig) {
  server.registerTool(
    "hiboutik_payment_type_list",
    {
      description: "List all payment types for a store",
      inputSchema: { store_id: z.number() },
    },
    async ({ store_id }) => {
      const result = await hiboutikRequest(config, `/payment_types/${store_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_payment_type_get",
    {
      description: "Get a payment type by ID",
      inputSchema: {
        payment_type_id: z.number(),
        store_id: z.number(),
      },
    },
    async ({ payment_type_id, store_id }) => {
      const result = await hiboutikRequest(config, `/payment_types/${store_id}/${payment_type_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_payment_type_create",
    {
      description: "Create a new payment type",
      inputSchema: {
        payment_type_name: z.string(),
        payment_type_store_id: z.number(),
        payment_type_display_order: z.number().optional(),
        payment_type_active: z.boolean().optional(),
        payment_type_is_cash: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/payment_types/", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_payment_type_update",
    {
      description: "Update a payment type",
      inputSchema: {
        payment_type_id: z.number(),
        store_id: z.number(),
        payment_type_name: z.string().optional(),
        payment_type_display_order: z.number().optional(),
        payment_type_active: z.boolean().optional(),
        payment_type_is_cash: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/payment_types/${params.store_id}/${params.payment_type_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_payment_type_delete",
    {
      description: "Delete a payment type",
      inputSchema: { payment_type_id: z.number() },
    },
    async ({ payment_type_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/payment_types/${payment_type_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_payment_get_due_date",
    {
      description: "Get payments due for a store",
      inputSchema: { store_id: z.number() },
    },
    async ({ store_id }) => {
      const result = await hiboutikRequest(config, `/payments/due_date/${store_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
