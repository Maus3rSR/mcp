import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const otherTools: Tool[] = [
  {
    name: "hiboutik_taxes_list",
    description: "List all tax rates",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_warehouses_list",
    description: "List all warehouses",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_rooms_list",
    description: "List all rooms (for hospitality)",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_resources_list",
    description: "List all resources",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_subscriptions_list",
    description: "List all subscriptions",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_message_send",
    description: "Send a message/shoutbox message",
    inputSchema: {
      type: "object",
      properties: {
        message_text: { type: "string", description: "Message text" },
        store_id: { type: "number", description: "Target store ID" },
        user_id: { type: "number", description: "Target user ID" },
      },
      required: ["message_text"],
    },
  },
  {
    name: "hiboutik_shoutbox_get",
    description: "Get shoutbox messages",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_print_misc",
    description: "Print miscellaneous document",
    inputSchema: {
      type: "object",
      properties: {
        content: { type: "string", description: "Content to print" },
        printer_id: { type: "number", description: "Printer ID" },
      },
      required: ["content"],
    },
  },
  {
    name: "hiboutik_reset_get",
    description: "Get reset token for password reset",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", description: "User email" },
      },
      required: ["email"],
    },
  },
  {
    name: "hiboutik_reset_loyalty_points",
    description: "Reset all customer loyalty points",
    inputSchema: {
      type: "object",
      properties: {
        confirm: { type: "boolean", description: "Confirm reset" },
      },
      required: ["confirm"],
    },
  },
  {
    name: "hiboutik_z_get_payment_types",
    description: "Get Z report payment types breakdown",
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
    name: "hiboutik_z_get_payments_received",
    description: "Get Z report payments received",
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
    name: "hiboutik_z_get_credit_deposits",
    description: "Get Z report customer credit deposits",
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
    name: "hiboutik_z_get_customers",
    description: "Get Z report customers",
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
    name: "hiboutik_z_get_taxes",
    description: "Get Z report taxes breakdown",
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
    name: "hiboutik_z_get_categories",
    description: "Get Z report sales by categories",
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
    name: "hiboutik_z_get_accounting",
    description: "Get Z report accounting accounts",
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
    name: "hiboutik_z_get_date",
    description: "Get Z report for current date",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_z_get_closure",
    description: "Get Z report closure data",
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
    name: "hiboutik_translation_get",
    description: "Get translations for a language and resource",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "Language code (fr, en, etc.)" },
        resource: { type: "string", description: "Resource name" },
      },
      required: ["language", "resource"],
    },
  },
  {
    name: "hiboutik_translation_get_by_id",
    description: "Get translation by resource ID",
    inputSchema: {
      type: "object",
      properties: {
        resource: { type: "string", description: "Resource name" },
        id: { type: "number", description: "Resource ID" },
      },
      required: ["resource", "id"],
    },
  },
  {
    name: "hiboutik_translation_create",
    description: "Create or update a translation",
    inputSchema: {
      type: "object",
      properties: {
        language: { type: "string", description: "Language code" },
        resource: { type: "string", description: "Resource name" },
        resource_id: { type: "number", description: "Resource ID" },
        translation_value: { type: "string", description: "Translated value" },
      },
      required: ["language", "resource", "resource_id", "translation_value"],
    },
  },
];

export async function handleOtherTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_taxes_list": {
      const result = await hiboutikRequest(config, "/taxes");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_warehouses_list": {
      const result = await hiboutikRequest(config, "/warehouses");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_rooms_list": {
      const result = await hiboutikRequest(config, "/rooms/");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_resources_list": {
      const result = await hiboutikRequest(config, "/ressources/");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_subscriptions_list": {
      const result = await hiboutikRequest(config, "/subscriptions");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_message_send": {
      const result = await hiboutikFormRequest(config, "/message/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_shoutbox_get": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/shoutbox/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_print_misc": {
      const result = await hiboutikFormRequest(config, "/print/misc/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_reset_get": {
      const result = await hiboutikFormRequest(config, "/reset/", "POST", { email: params.email });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_reset_loyalty_points": {
      const result = await hiboutikFormRequest(config, "/reset/customers/loyalty_points", "POST", { confirm: params.confirm });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_payment_types": {
      const result = await hiboutikRequest(config, `/z/payment_types/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_payments_received": {
      const result = await hiboutikRequest(config, `/z/payments_received/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_credit_deposits": {
      const result = await hiboutikRequest(config, `/z/customers_credit_deposits/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_customers": {
      const result = await hiboutikRequest(config, `/z/customers/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_taxes": {
      const result = await hiboutikRequest(config, `/z/taxes/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_categories": {
      const result = await hiboutikRequest(config, `/z/categories/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_accounting": {
      const result = await hiboutikRequest(config, `/z/accounting_accounts/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_date": {
      const result = await hiboutikRequest(config, "/z/date/");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_z_get_closure": {
      const result = await hiboutikRequest(config, `/z/closure/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_translation_get": {
      const result = await hiboutikRequest(config, `/translations/${params.language}/${params.resource}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_translation_get_by_id": {
      const result = await hiboutikRequest(config, `/translations_by_ressource_id/${params.resource}/${params.id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_translation_create": {
      const result = await hiboutikFormRequest(config, "/translations/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown other tool: ${name}`);
  }
}
