import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const paymentTools: Tool[] = [
  {
    name: "hiboutik_payment_type_list",
    description: "List all payment types for a store",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
      },
      required: ["store_id"],
    },
  },
  {
    name: "hiboutik_payment_type_get",
    description: "Get a payment type by ID",
    inputSchema: {
      type: "object",
      properties: {
        payment_type_id: { type: "number", description: "Payment type ID" },
        store_id: { type: "number", description: "Store ID" },
      },
      required: ["payment_type_id", "store_id"],
    },
  },
  {
    name: "hiboutik_payment_type_create",
    description: "Create a new payment type",
    inputSchema: {
      type: "object",
      properties: {
        payment_type_name: { type: "string", description: "Payment type name" },
        payment_type_store_id: { type: "number", description: "Store ID" },
        payment_type_display_order: { type: "number", description: "Display order" },
        payment_type_active: { type: "boolean", description: "Is active" },
        payment_type_is_cash: { type: "boolean", description: "Is cash payment" },
      },
      required: ["payment_type_name", "payment_type_store_id"],
    },
  },
  {
    name: "hiboutik_payment_type_update",
    description: "Update a payment type",
    inputSchema: {
      type: "object",
      properties: {
        payment_type_id: { type: "number", description: "Payment type ID" },
        payment_type_name: { type: "string", description: "Payment type name" },
        payment_type_display_order: { type: "number", description: "Display order" },
        payment_type_active: { type: "boolean", description: "Is active" },
        payment_type_is_cash: { type: "boolean", description: "Is cash payment" },
      },
      required: ["payment_type_id"],
    },
  },
  {
    name: "hiboutik_payment_type_delete",
    description: "Delete a payment type",
    inputSchema: {
      type: "object",
      properties: {
        payment_type_id: { type: "number", description: "Payment type ID" },
      },
      required: ["payment_type_id"],
    },
  },
  {
    name: "hiboutik_payment_get_due_date",
    description: "Get payments due for a store",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
      },
      required: ["store_id"],
    },
  },
];

export async function handlePaymentTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_payment_type_list": {
      const result = await hiboutikRequest(config, `/payment_types/${params.store_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_payment_type_get": {
      const result = await hiboutikRequest(config, `/payment_types/${params.store_id}/${params.payment_type_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_payment_type_create": {
      const result = await hiboutikFormRequest(config, "/payment_types/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_payment_type_update": {
      const result = await hiboutikFormRequest(config, `/payment_types/${params.store_id}/${params.payment_type_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_payment_type_delete": {
      const result = await hiboutikFormRequest(config, `/payment_types/${params.payment_type_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_payment_get_due_date": {
      const result = await hiboutikRequest(config, `/payments/due_date/${params.store_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown payment tool: ${name}`);
  }
}
