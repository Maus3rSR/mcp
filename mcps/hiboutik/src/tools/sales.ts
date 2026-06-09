import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerSaleTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_sale_list",
    {
      description: "List all sales with optional pagination",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
        store_id: z.number().optional(),
      },
    },
    async ({ page, limit, store_id }) => {
      const query = new URLSearchParams();
      if (page) query.append("page", String(page));
      if (limit) query.append("limit", String(limit));
      const result = await hiboutikRequest(
        config,
        `/sales?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get",
    {
      description: "Get a sale by ID",
      inputSchema: { sale_id: z.number() },
    },
    async ({ sale_id }) => {
      const result = await hiboutikRequest(config, `/sale/${sale_id}/`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_create",
    {
      description: "Create a new sale (open a new ticket)",
      inputSchema: {
        customer_id: z.number().optional(),
        store_id: z.number(),
        sale_note: z.string().optional(),
        sale_reference: z.string().optional(),
        sale_type: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_update",
    {
      description: "Update an existing sale",
      inputSchema: {
        sale_id: z.number(),
        customer_id: z.number().optional(),
        sale_note: z.string().optional(),
        sale_reference: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale/${params.sale_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_delete",
    {
      description: "Delete a sale by ID",
      inputSchema: { sale_id: z.number() },
    },
    async ({ sale_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale/${sale_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_product",
    {
      description: "Add a product to a sale",
      inputSchema: {
        sale_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
        unit_price: z.number().optional(),
        size_id: z.number().optional(),
        serial_number: z.string().optional(),
        discount_percent: z.number().optional(),
        line_item_note: z.string().optional(),
        line_item_metadata: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/add_product/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_credit_note",
    {
      description: "Add a credit note to a sale",
      inputSchema: {
        sale_id: z.number(),
        credit_note_amount: z.number(),
        credit_note_reason: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/add_credit_note/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_close",
    {
      description: "Close a sale (finalize payment)",
      inputSchema: {
        sale_id: z.number(),
        payment_type: z.number(),
        amount: z.number(),
        customer_credit_used: z.number().optional(),
        split_payment: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/close/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_closed_by_date",
    {
      description: "Get closed sales for a specific date",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(
        config,
        `/closed_sales/${store_id}/${year}/${month}/${day}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_first_closed",
    {
      description: "Get the first closed sale for a store",
      inputSchema: { store_id: z.number() },
    },
    async ({ store_id }) => {
      const result = await hiboutikRequest(
        config,
        `/first_closed_sale/${store_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_closed_by_tag",
    {
      description: "Get closed sales by tag for a specific date",
      inputSchema: {
        tag_id: z.number(),
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ tag_id, store_id, year, month, day }) => {
      const result = await hiboutikRequest(
        config,
        `/closed_sales_by_tag/${tag_id}/${store_id}/${year}/${month}/${day}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_open",
    {
      description: "Get all open sales for a store",
      inputSchema: { store_id: z.number() },
    },
    async ({ store_id }) => {
      const result = await hiboutikRequest(
        config,
        `/open_sales/${store_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_line_item",
    {
      description: "Get a specific line item from a sale",
      inputSchema: { line_item_id: z.number() },
    },
    async ({ line_item_id }) => {
      const result = await hiboutikRequest(
        config,
        `/sale_line_item/${line_item_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_update_line_item",
    {
      description: "Update a line item in a sale",
      inputSchema: {
        line_item_id: z.number(),
        quantity: z.number().optional(),
        unit_price: z.number().optional(),
        discount_percent: z.number().optional(),
        line_item_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale_line_item/${params.line_item_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_delete_line_item",
    {
      description: "Delete a line item from a sale",
      inputSchema: { line_item_id: z.number() },
    },
    async ({ line_item_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale_line_item/${line_item_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_line_item_modifier",
    {
      description: "Add a modifier to a line item",
      inputSchema: {
        line_item_id: z.number(),
        modifier_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sale_line_item_modifier/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_remove_line_item_modifier",
    {
      description: "Remove a modifier from a line item",
      inputSchema: {
        line_item_id: z.number(),
        modifier_id: z.number(),
      },
    },
    async ({ line_item_id, modifier_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale_line_item_modifier/${line_item_id}/${modifier_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_exchange_line_item",
    {
      description: "Exchange a line item for a different stock item",
      inputSchema: {
        line_item_id: z.number(),
        stock_id: z.number(),
      },
    },
    async ({ line_item_id, stock_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sale_line_item_exchange/${line_item_id}/${stock_id}/`,
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_global_discount",
    {
      description: "Add a global discount to a sale",
      inputSchema: {
        sale_id: z.number(),
        discount_percent: z.number().optional(),
        discount_amount: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/add_global_discount/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_open_package",
    {
      description: "Open a product package and add contents to sale",
      inputSchema: {
        sale_id: z.number(),
        line_item_id: z.number(),
        product_line_item_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/open_package/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_unpack",
    {
      description: "Unpack a line item from a package",
      inputSchema: { line_item_id: z.number() },
    },
    async ({ line_item_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sales/open_package/unpack/${line_item_id}`,
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_payment_div",
    {
      description: "Add a split payment to a sale",
      inputSchema: {
        sale_id: z.number(),
        payment_type_id: z.number(),
        amount: z.number(),
        due_date: z.string().optional(),
        payment_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales_payment_div/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_update_payment_div",
    {
      description: "Update a split payment",
      inputSchema: {
        payment_detail_id: z.number(),
        amount: z.number().optional(),
        due_date: z.string().optional(),
        payment_note: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/sales_payment_div/${params.payment_detail_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_delete_payment_div",
    {
      description: "Delete a split payment",
      inputSchema: { payment_detail_id: z.number() },
    },
    async ({ payment_detail_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sales_payment_div/${payment_detail_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_comment",
    {
      description: "Add a comment to a sale",
      inputSchema: {
        sale_id: z.number(),
        comment_text: z.string(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales/comments/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_get_tags",
    {
      description: "Get tags for a sale",
      inputSchema: { sale_id: z.number() },
    },
    async ({ sale_id }) => {
      const result = await hiboutikRequest(
        config,
        `/sales_tags/${sale_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_add_tag",
    {
      description: "Add a tag to a sale",
      inputSchema: {
        sale_id: z.number(),
        tag_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/sales_tags/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_remove_tag",
    {
      description: "Remove a tag from a sale",
      inputSchema: {
        sale_id: z.number(),
        tag_id: z.number(),
      },
    },
    async ({ sale_id, tag_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/sales_tags/${sale_id}/${tag_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_sale_search_by_ext_ref",
    {
      description: "Search sales by external reference",
      inputSchema: { query: z.string() },
    },
    async ({ query }) => {
      const result = await hiboutikRequest(
        config,
        `/sales/search/ext_ref/${encodeURIComponent(String(query))}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
