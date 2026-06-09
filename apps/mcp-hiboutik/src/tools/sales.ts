import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const saleTools: Tool[] = [
  {
    name: "hiboutik_sale_list",
    description: "List all sales with optional pagination",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
        store_id: { type: "number", description: "Filter by store ID" },
      },
    },
  },
  {
    name: "hiboutik_sale_get",
    description: "Get a sale by ID",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_sale_create",
    description: "Create a new sale (open a new ticket)",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID (optional)" },
        store_id: { type: "number", description: "Store ID" },
        sale_note: { type: "string", description: "Sale note" },
        sale_reference: { type: "string", description: "External reference" },
        sale_type: { type: "string", description: "Sale type (sale, quote, order)" },
      },
      required: ["store_id"],
    },
  },
  {
    name: "hiboutik_sale_update",
    description: "Update an existing sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        customer_id: { type: "number", description: "Customer ID" },
        sale_note: { type: "string", description: "Sale note" },
        sale_reference: { type: "string", description: "External reference" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_sale_delete",
    description: "Delete a sale by ID",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_sale_add_product",
    description: "Add a product to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        product_id: { type: "number", description: "Product ID" },
        quantity: { type: "number", description: "Quantity to add" },
        unit_price: { type: "number", description: "Custom unit price (optional)" },
        size_id: { type: "number", description: "Size ID (optional, default 0)" },
        serial_number: { type: "string", description: "Serial number for serialized products" },
        discount_percent: { type: "number", description: "Discount percentage" },
        line_item_note: { type: "string", description: "Line item note" },
        line_item_metadata: { type: "string", description: "Line item metadata" },
      },
      required: ["sale_id", "product_id", "quantity"],
    },
  },
  {
    name: "hiboutik_sale_add_credit_note",
    description: "Add a credit note to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        credit_note_amount: { type: "number", description: "Credit note amount" },
        credit_note_reason: { type: "string", description: "Reason for credit" },
      },
      required: ["sale_id", "credit_note_amount"],
    },
  },
  {
    name: "hiboutik_sale_close",
    description: "Close a sale (finalize payment)",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        payment_type: { type: "number", description: "Payment type ID" },
        amount: { type: "number", description: "Payment amount" },
        customer_credit_used: { type: "number", description: "Customer credit to use" },
        split_payment: { type: "boolean", description: "Enable split payment" },
      },
      required: ["sale_id", "payment_type", "amount"],
    },
  },
  {
    name: "hiboutik_sale_get_closed_by_date",
    description: "Get closed sales for a specific date",
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
    name: "hiboutik_sale_get_first_closed",
    description: "Get the first closed sale for a store",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
      },
      required: ["store_id"],
    },
  },
  {
    name: "hiboutik_sale_get_closed_by_tag",
    description: "Get closed sales by tag for a specific date",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day" },
      },
      required: ["tag_id", "store_id", "year", "month", "day"],
    },
  },
  {
    name: "hiboutik_sale_get_open",
    description: "Get all open sales for a store",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
      },
      required: ["store_id"],
    },
  },
  {
    name: "hiboutik_sale_get_line_item",
    description: "Get a specific line item from a sale",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
      },
      required: ["line_item_id"],
    },
  },
  {
    name: "hiboutik_sale_update_line_item",
    description: "Update a line item in a sale",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
        quantity: { type: "number", description: "New quantity" },
        unit_price: { type: "number", description: "New unit price" },
        discount_percent: { type: "number", description: "Discount percentage" },
        line_item_note: { type: "string", description: "Line item note" },
      },
      required: ["line_item_id"],
    },
  },
  {
    name: "hiboutik_sale_delete_line_item",
    description: "Delete a line item from a sale",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
      },
      required: ["line_item_id"],
    },
  },
  {
    name: "hiboutik_sale_add_line_item_modifier",
    description: "Add a modifier to a line item",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
        modifier_id: { type: "number", description: "Modifier ID" },
      },
      required: ["line_item_id", "modifier_id"],
    },
  },
  {
    name: "hiboutik_sale_remove_line_item_modifier",
    description: "Remove a modifier from a line item",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
        modifier_id: { type: "number", description: "Modifier ID" },
      },
      required: ["line_item_id", "modifier_id"],
    },
  },
  {
    name: "hiboutik_sale_exchange_line_item",
    description: "Exchange a line item for a different stock item",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID" },
        stock_id: { type: "number", description: "New stock item ID" },
      },
      required: ["line_item_id", "stock_id"],
    },
  },
  {
    name: "hiboutik_sale_add_global_discount",
    description: "Add a global discount to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        discount_percent: { type: "number", description: "Discount percentage" },
        discount_amount: { type: "number", description: "Fixed discount amount" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_sale_open_package",
    description: "Open a product package and add contents to sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        line_item_id: { type: "number", description: "Package line item ID" },
        product_line_item_id: { type: "number", description: "Product line item ID (for pack)" },
      },
      required: ["sale_id", "line_item_id"],
    },
  },
  {
    name: "hiboutik_sale_unpack",
    description: "Unpack a line item from a package",
    inputSchema: {
      type: "object",
      properties: {
        line_item_id: { type: "number", description: "Line item ID to unpack" },
      },
      required: ["line_item_id"],
    },
  },
  {
    name: "hiboutik_sale_add_payment_div",
    description: "Add a split payment to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        payment_type_id: { type: "number", description: "Payment type ID" },
        amount: { type: "number", description: "Payment amount" },
        due_date: { type: "string", description: "Payment due date (YYYY-MM-DD)" },
        payment_note: { type: "string", description: "Payment note" },
      },
      required: ["sale_id", "payment_type_id", "amount"],
    },
  },
  {
    name: "hiboutik_sale_update_payment_div",
    description: "Update a split payment",
    inputSchema: {
      type: "object",
      properties: {
        payment_detail_id: { type: "number", description: "Payment detail ID" },
        amount: { type: "number", description: "New payment amount" },
        due_date: { type: "string", description: "New due date" },
        payment_note: { type: "string", description: "Payment note" },
      },
      required: ["payment_detail_id"],
    },
  },
  {
    name: "hiboutik_sale_delete_payment_div",
    description: "Delete a split payment",
    inputSchema: {
      type: "object",
      properties: {
        payment_detail_id: { type: "number", description: "Payment detail ID" },
      },
      required: ["payment_detail_id"],
    },
  },
  {
    name: "hiboutik_sale_add_comment",
    description: "Add a comment to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        comment_text: { type: "string", description: "Comment text" },
      },
      required: ["sale_id", "comment_text"],
    },
  },
  {
    name: "hiboutik_sale_get_tags",
    description: "Get tags for a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
      },
      required: ["sale_id"],
    },
  },
  {
    name: "hiboutik_sale_add_tag",
    description: "Add a tag to a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["sale_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_sale_remove_tag",
    description: "Remove a tag from a sale",
    inputSchema: {
      type: "object",
      properties: {
        sale_id: { type: "number", description: "Sale ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["sale_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_sale_search_by_ext_ref",
    description: "Search sales by external reference",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "External reference to search" },
      },
      required: ["query"],
    },
  },
];

export async function handleSaleTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_sale_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/sales?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get": {
      const result = await hiboutikRequest(config, `/sale/${params.sale_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_create": {
      const result = await hiboutikFormRequest(config, "/sales/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_update": {
      const result = await hiboutikFormRequest(config, `/sale/${params.sale_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_delete": {
      const result = await hiboutikFormRequest(config, `/sale/${params.sale_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_product": {
      const result = await hiboutikFormRequest(config, "/sales/add_product/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_credit_note": {
      const result = await hiboutikFormRequest(config, "/sales/add_credit_note/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_close": {
      const result = await hiboutikFormRequest(config, "/sales/close/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_closed_by_date": {
      const result = await hiboutikRequest(config, `/closed_sales/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_first_closed": {
      const result = await hiboutikRequest(config, `/first_closed_sale/${params.store_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_closed_by_tag": {
      const result = await hiboutikRequest(config, `/closed_sales_by_tag/${params.tag_id}/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_open": {
      const result = await hiboutikRequest(config, `/open_sales/${params.store_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_line_item": {
      const result = await hiboutikRequest(config, `/sale_line_item/${params.line_item_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_update_line_item": {
      const result = await hiboutikFormRequest(config, `/sale_line_item/${params.line_item_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_delete_line_item": {
      const result = await hiboutikFormRequest(config, `/sale_line_item/${params.line_item_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_line_item_modifier": {
      const result = await hiboutikFormRequest(config, "/sale_line_item_modifier/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_remove_line_item_modifier": {
      const result = await hiboutikFormRequest(config, `/sale_line_item_modifier/${params.line_item_id}/${params.modifier_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_exchange_line_item": {
      const result = await hiboutikFormRequest(config, `/sale_line_item_exchange/${params.line_item_id}/${params.stock_id}/`, "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_global_discount": {
      const result = await hiboutikFormRequest(config, "/sales/add_global_discount/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_open_package": {
      const result = await hiboutikFormRequest(config, "/sales/open_package/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_unpack": {
      const result = await hiboutikFormRequest(config, `/sales/open_package/unpack/${params.line_item_id}`, "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_payment_div": {
      const result = await hiboutikFormRequest(config, "/sales_payment_div/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_update_payment_div": {
      const result = await hiboutikFormRequest(config, `/sales_payment_div/${params.payment_detail_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_delete_payment_div": {
      const result = await hiboutikFormRequest(config, `/sales_payment_div/${params.payment_detail_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_comment": {
      const result = await hiboutikFormRequest(config, "/sales/comments/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_get_tags": {
      const result = await hiboutikRequest(config, `/sales_tags/${params.sale_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_add_tag": {
      const result = await hiboutikFormRequest(config, "/sales_tags/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_remove_tag": {
      const result = await hiboutikFormRequest(config, `/sales_tags/${params.sale_id}/${params.tag_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_sale_search_by_ext_ref": {
      const result = await hiboutikRequest(config, `/sales/search/ext_ref/${encodeURIComponent(String(params.query))}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown sale tool: ${name}`);
  }
}
