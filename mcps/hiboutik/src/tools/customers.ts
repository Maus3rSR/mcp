import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerCustomerTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_customer_list",
    {
      description: "List all customers with optional pagination",
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
        `/customers/?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get",
    {
      description: "Get a customer by ID",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(config, `/customer/${customer_id}/`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_create",
    {
      description: "Create a new customer",
      inputSchema: {
        customer_lastname: z.string(),
        customer_firstname: z.string().optional(),
        customer_email: z.string().optional(),
        customer_phone: z.string().optional(),
        customer_address: z.string().optional(),
        customer_zipcode: z.string().optional(),
        customer_city: z.string().optional(),
        customer_country: z.string().optional(),
        customer_birthday: z.string().optional(),
        customer_notes: z.string().optional(),
        customer_loyalty_points: z.number().optional(),
        customer_credit: z.number().optional(),
        customer_newsletter: z.boolean().optional(),
        customer_optin: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/customers/",
        "POST",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_update",
    {
      description: "Update an existing customer",
      inputSchema: {
        customer_id: z.number(),
        customer_lastname: z.string().optional(),
        customer_firstname: z.string().optional(),
        customer_email: z.string().optional(),
        customer_phone: z.string().optional(),
        customer_address: z.string().optional(),
        customer_zipcode: z.string().optional(),
        customer_city: z.string().optional(),
        customer_country: z.string().optional(),
        customer_birthday: z.string().optional(),
        customer_notes: z.string().optional(),
        customer_loyalty_points: z.number().optional(),
        customer_credit: z.number().optional(),
        customer_newsletter: z.boolean().optional(),
        customer_optin: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/customer/${params.customer_id}/`,
        "PUT",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_delete",
    {
      description: "Delete a customer by ID",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/customer/${customer_id}/`,
        "DELETE",
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_sales",
    {
      description: "Get all sales for a specific customer",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customer/${customer_id}/sales/`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_products_sold",
    {
      description: "Get all products sold to a specific customer",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customer/${customer_id}/products_solds/`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_credit",
    {
      description: "Get customer credit balance",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customers_credit/${customer_id}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_update_credit",
    {
      description: "Update customer credit (add credit or payment)",
      inputSchema: {
        customers_id: z.number(),
        customers_credit_amount: z.number(),
        customers_credit_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/customers_credit/",
        "POST",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_addresses",
    {
      description: "Get all addresses for a customer",
      inputSchema: { customer_id: z.number().optional() },
    },
    async ({ customer_id }) => {
      const query = new URLSearchParams();
      if (customer_id) query.append("customer_id", String(customer_id));
      const result = await hiboutikRequest(
        config,
        `/customers_addresses?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_create_address",
    {
      description: "Create a new address for a customer",
      inputSchema: {
        customer_id: z.number(),
        address_type: z.string(),
        address_name: z.string().optional(),
        address_address: z.string(),
        address_zipcode: z.string(),
        address_city: z.string(),
        address_country: z.string().optional(),
        address_phone: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/customers_addresses",
        "POST",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_update_address",
    {
      description: "Update an existing customer address",
      inputSchema: {
        address_id: z.number(),
        address_type: z.string().optional(),
        address_name: z.string().optional(),
        address_address: z.string().optional(),
        address_zipcode: z.string().optional(),
        address_city: z.string().optional(),
        address_country: z.string().optional(),
        address_phone: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/customers_addresses/${params.address_id}/`,
        "PUT",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_delete_address",
    {
      description: "Delete a customer address",
      inputSchema: { address_id: z.number() },
    },
    async ({ address_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/customers_addresses/${address_id}/`,
        "DELETE",
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_merge",
    {
      description: "Merge two customers (source into target)",
      inputSchema: {
        source_customer_id: z.number(),
        target_customer_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/customers_merge/",
        "POST",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_birthday_list",
    {
      description: "Get customers with birthdays on a specific date",
      inputSchema: { month: z.number(), day: z.number() },
    },
    async ({ month, day }) => {
      const result = await hiboutikRequest(
        config,
        `/customers_birthday/${month}/${day}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_lists",
    { description: "Get all customer lists" },
    async () => {
      const result = await hiboutikRequest(config, "/customers/lists/");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_list",
    {
      description: "Get a specific customer list by ID",
      inputSchema: { list_id: z.number() },
    },
    async ({ list_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customers/lists/${list_id}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_tags",
    {
      description: "Get all tags for a customer",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customers_tags/${customer_id}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_add_tag",
    {
      description: "Add a tag to a customer",
      inputSchema: { customer_id: z.number(), tag_id: z.number() },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/customers_tags/",
        "POST",
        params,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_remove_tag",
    {
      description: "Remove a tag from a customer",
      inputSchema: { customer_id: z.number(), tag_id: z.number() },
    },
    async ({ customer_id, tag_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/customers_tags/${customer_id}/${tag_id}`,
        "DELETE",
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_get_time_tracking",
    {
      description: "Get time tracking for a customer",
      inputSchema: { customer_id: z.number() },
    },
    async ({ customer_id }) => {
      const result = await hiboutikRequest(
        config,
        `/customers_time_tracking/${customer_id}/`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_customer_count",
    { description: "Get the total number of customers" },
    async () => {
      const result = await hiboutikRequest(config, "/number_of_customers");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
