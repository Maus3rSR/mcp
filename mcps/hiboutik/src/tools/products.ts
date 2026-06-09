import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerProductTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_product_list",
    {
      description: "List all products with optional filters and pagination",
      inputSchema: {
        page: z.number().optional(),
        limit: z.number().optional(),
        category_id: z.number().optional(),
        brand_id: z.number().optional(),
        supplier_id: z.number().optional(),
      },
    },
    async (params) => {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      if (params.category_id) query.append("category_id", String(params.category_id));
      if (params.brand_id) query.append("brand_id", String(params.brand_id));
      if (params.supplier_id) query.append("supplier_id", String(params.supplier_id));
      const result = await hiboutikRequest(
        config,
        `/products/?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get",
    {
      description: "Get a product by ID",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/product/${product_id}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_create",
    {
      description: "Create a new product",
      inputSchema: {
        product_model: z.string(),
        product_description: z.string().optional(),
        product_price: z.number(),
        product_supply_price: z.number().optional(),
        product_category: z.number().optional(),
        product_brand: z.number().optional(),
        product_supplier: z.number().optional(),
        product_tax: z.number().optional(),
        product_barcode: z.string().optional(),
        product_reference: z.string().optional(),
        product_type: z.string().optional(),
        product_package_quantity: z.number().optional(),
        product_virtual: z.boolean().optional(),
        product_consignment: z.boolean().optional(),
        product_serialized: z.boolean().optional(),
        product_stock_management: z.boolean().optional(),
        product_discountable: z.boolean().optional(),
        product_active: z.boolean().optional(),
        size_type_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/products/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_update",
    {
      description: "Update an existing product",
      inputSchema: {
        product_id: z.number(),
        product_model: z.string().optional(),
        product_description: z.string().optional(),
        product_price: z.number().optional(),
        product_supply_price: z.number().optional(),
        product_category: z.number().optional(),
        product_brand: z.number().optional(),
        product_supplier: z.number().optional(),
        product_tax: z.number().optional(),
        product_barcode: z.string().optional(),
        product_reference: z.string().optional(),
        product_type: z.string().optional(),
        product_virtual: z.boolean().optional(),
        product_consignment: z.boolean().optional(),
        product_serialized: z.boolean().optional(),
        product_stock_management: z.boolean().optional(),
        product_discountable: z.boolean().optional(),
        product_active: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/product/${params.product_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_delete",
    {
      description: "Delete a product by ID",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/products/${product_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_search_by_name",
    {
      description: "Search products by name",
      inputSchema: { query: z.string() },
    },
    async ({ query }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/name/${encodeURIComponent(query)}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_search_by_barcode",
    {
      description: "Search products by barcode",
      inputSchema: { barcode: z.string() },
    },
    async ({ barcode }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/barcode/${encodeURIComponent(barcode)}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_search_by_supplier_reference",
    {
      description: "Search products by supplier reference",
      inputSchema: { reference: z.string() },
    },
    async ({ reference }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/supplier_reference/${encodeURIComponent(reference)}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_by_category",
    {
      description: "Get products by category ID",
      inputSchema: { category_id: z.number() },
    },
    async ({ category_id }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/category/${category_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_by_tax",
    {
      description: "Get products by tax ID",
      inputSchema: { tax_id: z.number() },
    },
    async ({ tax_id }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/taxes/${tax_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_by_tag",
    {
      description: "Get products by tag ID",
      inputSchema: { tag_id: z.number() },
    },
    async ({ tag_id }) => {
      const result = await hiboutikRequest(
        config,
        `/products/search/tags/${tag_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_open_packages",
    { description: "Get products with open packages" },
    async () => {
      const result = await hiboutikRequest(
        config,
        "/products/search/open_packages",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_sold_history",
    {
      description: "Get products sold history for a specific date range",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async (params) => {
      let endpoint = `/products_sold/${params.store_id}/${params.year}/${params.month}/`;
      if (params.day) {
        endpoint = `/products_sold/${params.store_id}/${params.year}/${params.month}/${params.day}/`;
      }
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_purchased_history",
    {
      description: "Get products purchased history for a warehouse",
      inputSchema: {
        warehouse_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async (params) => {
      let endpoint = `/products_purchased/${params.warehouse_id}/${params.year}/${params.month}/`;
      if (params.day) {
        endpoint = `/products_purchased/${params.warehouse_id}/${params.year}/${params.month}/${params.day}/`;
      }
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_returned_history",
    {
      description: "Get products returned history",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async (params) => {
      let endpoint = `/products_returned/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) {
        endpoint = `/products_returned/${params.store_id}/${params.year}/${params.month}/${params.day}`;
      }
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_purchase_history",
    {
      description: "Get purchase history for a specific product",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/product_purchased_history/${product_id}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_modifiers",
    {
      description: "Get modifiers for a product",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/products_modifiers/${product_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_add_modifier",
    {
      description: "Add a modifier to a product",
      inputSchema: {
        product_id: z.number(),
        modifier_id: z.number(),
        modifier_price: z.number().optional(),
        is_default: z.boolean().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/products_modifiers/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_remove_modifier",
    {
      description: "Remove a modifier from a product",
      inputSchema: {
        product_id: z.number(),
        modifier_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/products_modifiers/${params.product_id}/${params.modifier_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_tags",
    {
      description: "Get tags for a product",
      inputSchema: { product_id: z.number() },
    },
    async ({ product_id }) => {
      const result = await hiboutikRequest(
        config,
        `/products_tags/${product_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_add_tag",
    {
      description: "Add a tag to a product",
      inputSchema: {
        product_id: z.number(),
        tag_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/products_tags/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_remove_tag",
    {
      description: "Remove a tag from a product",
      inputSchema: {
        product_id: z.number(),
        tag_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/products_tags/${params.product_id}/${params.tag_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_get_specific_rules",
    {
      description: "Get specific pricing rules for a product in a store",
      inputSchema: {
        shop_id: z.number(),
        product_id: z.number(),
        size_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikRequest(
        config,
        `/product_specific_rules/${params.shop_id}/${params.product_id}/${params.size_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_set_specific_rules",
    {
      description: "Set specific pricing rules for a product in a store",
      inputSchema: {
        shop_id: z.number(),
        product_id: z.number(),
        size_id: z.number(),
        specific_price: z.number().optional(),
        specific_supply_price: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/product_specific_rules/${params.shop_id}/${params.product_id}/${params.size_id}`,
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_product_generate_barcode",
    {
      description: "Generate a barcode for a product",
      inputSchema: {
        store_id: z.number(),
        product_id: z.number(),
        size_id: z.number(),
      },
    },
    async (params) => {
      const result = await hiboutikRequest(
        config,
        `/products_barcode/${params.store_id}/${params.product_id}/${params.size_id}/`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
