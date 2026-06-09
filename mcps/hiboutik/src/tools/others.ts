import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerOtherTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_taxes_list",
    { description: "List all tax rates" },
    async () => {
      const result = await hiboutikRequest(config, "/taxes");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_warehouses_list",
    { description: "List all warehouses" },
    async () => {
      const result = await hiboutikRequest(config, "/warehouses");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_rooms_list",
    { description: "List all rooms (for hospitality)" },
    async () => {
      const result = await hiboutikRequest(config, "/rooms/");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_resources_list",
    { description: "List all resources" },
    async () => {
      const result = await hiboutikRequest(config, "/ressources/");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_subscriptions_list",
    { description: "List all subscriptions" },
    async () => {
      const result = await hiboutikRequest(config, "/subscriptions");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_message_send",
    {
      description: "Send a message/shoutbox message",
      inputSchema: {
        message_text: z.string(),
        store_id: z.number().optional(),
        user_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/message/", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_shoutbox_get",
    {
      description: "Get shoutbox messages",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
      },
    },
    async ({ page, limit }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(config, `/shoutbox/?${query.toString()}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_print_misc",
    {
      description: "Print miscellaneous document",
      inputSchema: {
        content: z.string(),
        printer_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/print/misc/", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_reset_get",
    {
      description: "Get reset token for password reset",
      inputSchema: { email: z.string() },
    },
    async ({ email }) => {
      const result = await hiboutikFormRequest(config, "/reset/", "POST", { email });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_reset_loyalty_points",
    {
      description: "Reset all customer loyalty points",
      inputSchema: { confirm: z.boolean() },
    },
    async ({ confirm }) => {
      const result = await hiboutikFormRequest(config, "/reset/customers/loyalty_points", "POST", { confirm });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_payment_types",
    {
      description: "Get Z report payment types breakdown",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/payment_types/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_payments_received",
    {
      description: "Get Z report payments received",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/payments_received/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_credit_deposits",
    {
      description: "Get Z report customer credit deposits",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/customers_credit_deposits/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_customers",
    {
      description: "Get Z report customers",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/customers/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_taxes",
    {
      description: "Get Z report taxes breakdown",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/taxes/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_categories",
    {
      description: "Get Z report sales by categories",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/categories/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_accounting",
    {
      description: "Get Z report accounting accounts",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/accounting_accounts/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_date",
    { description: "Get Z report for current date" },
    async () => {
      const result = await hiboutikRequest(config, "/z/date/");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_z_get_closure",
    {
      description: "Get Z report closure data",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(config, `/z/closure/${store_id}/${year}/${month}/${day}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_translation_get",
    {
      description: "Get translations for a language and resource",
      inputSchema: {
        language: z.string(),
        resource: z.string(),
      },
    },
    async ({ language, resource }) => {
      const result = await hiboutikRequest(config, `/translations/${language}/${resource}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_translation_get_by_id",
    {
      description: "Get translation by resource ID",
      inputSchema: {
        resource: z.string(),
        id: z.number(),
      },
    },
    async ({ resource, id }) => {
      const result = await hiboutikRequest(config, `/translations_by_ressource_id/${resource}/${id}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_translation_create",
    {
      description: "Create or update a translation",
      inputSchema: {
        language: z.string(),
        resource: z.string(),
        resource_id: z.number(),
        translation_value: z.string(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(config, "/translations/", "POST", params);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
