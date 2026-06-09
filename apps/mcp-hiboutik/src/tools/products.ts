import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const productTools: Tool[] = [
  {
    name: "hiboutik_product_list",
    description: "List all products with optional filters and pagination",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
        category_id: { type: "number", description: "Filter by category ID" },
        brand_id: { type: "number", description: "Filter by brand ID" },
        supplier_id: { type: "number", description: "Filter by supplier ID" },
      },
    },
  },
  {
    name: "hiboutik_product_get",
    description: "Get a product by ID",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_create",
    description: "Create a new product",
    inputSchema: {
      type: "object",
      properties: {
        product_model: { type: "string", description: "Product name/model" },
        product_description: { type: "string", description: "Product description" },
        product_price: { type: "number", description: "Selling price" },
        product_supply_price: { type: "number", description: "Supply/purchase price" },
        product_category: { type: "number", description: "Category ID" },
        product_brand: { type: "number", description: "Brand ID" },
        product_supplier: { type: "number", description: "Supplier ID" },
        product_tax: { type: "number", description: "Tax ID" },
        product_barcode: { type: "string", description: "Product barcode/EAN" },
        product_reference: { type: "string", description: "Supplier reference" },
        product_type: { type: "string", description: "Product type (simple, variable, package)" },
        product_package_quantity: { type: "number", description: "Package quantity if applicable" },
        product_virtual: { type: "boolean", description: "Is virtual product" },
        product_consignment: { type: "boolean", description: "Is consignment product" },
        product_serialized: { type: "boolean", description: "Requires serial number" },
        product_stock_management: { type: "boolean", description: "Enable stock management" },
        product_discountable: { type: "boolean", description: "Allow discounts" },
        product_active: { type: "boolean", description: "Is product active" },
        size_type_id: { type: "number", description: "Size type ID" },
      },
      required: ["product_model", "product_price"],
    },
  },
  {
    name: "hiboutik_product_update",
    description: "Update an existing product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        product_model: { type: "string", description: "Product name/model" },
        product_description: { type: "string", description: "Product description" },
        product_price: { type: "number", description: "Selling price" },
        product_supply_price: { type: "number", description: "Supply/purchase price" },
        product_category: { type: "number", description: "Category ID" },
        product_brand: { type: "number", description: "Brand ID" },
        product_supplier: { type: "number", description: "Supplier ID" },
        product_tax: { type: "number", description: "Tax ID" },
        product_barcode: { type: "string", description: "Product barcode/EAN" },
        product_reference: { type: "string", description: "Supplier reference" },
        product_type: { type: "string", description: "Product type" },
        product_virtual: { type: "boolean", description: "Is virtual product" },
        product_consignment: { type: "boolean", description: "Is consignment product" },
        product_serialized: { type: "boolean", description: "Requires serial number" },
        product_stock_management: { type: "boolean", description: "Enable stock management" },
        product_discountable: { type: "boolean", description: "Allow discounts" },
        product_active: { type: "boolean", description: "Is product active" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_delete",
    description: "Delete a product by ID",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_search_by_name",
    description: "Search products by name",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
    },
  },
  {
    name: "hiboutik_product_search_by_barcode",
    description: "Search products by barcode",
    inputSchema: {
      type: "object",
      properties: {
        barcode: { type: "string", description: "Barcode to search" },
      },
      required: ["barcode"],
    },
  },
  {
    name: "hiboutik_product_search_by_supplier_reference",
    description: "Search products by supplier reference",
    inputSchema: {
      type: "object",
      properties: {
        reference: { type: "string", description: "Supplier reference" },
      },
      required: ["reference"],
    },
  },
  {
    name: "hiboutik_product_get_by_category",
    description: "Get products by category ID",
    inputSchema: {
      type: "object",
      properties: {
        category_id: { type: "number", description: "Category ID" },
      },
      required: ["category_id"],
    },
  },
  {
    name: "hiboutik_product_get_by_tax",
    description: "Get products by tax ID",
    inputSchema: {
      type: "object",
      properties: {
        tax_id: { type: "number", description: "Tax ID" },
      },
      required: ["tax_id"],
    },
  },
  {
    name: "hiboutik_product_get_by_tag",
    description: "Get products by tag ID",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["tag_id"],
    },
  },
  {
    name: "hiboutik_product_get_open_packages",
    description: "Get products with open packages",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_product_get_sold_history",
    description: "Get products sold history for a specific date range",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month (1-12)" },
        day: { type: "number", description: "Day (1-31, optional)" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_product_get_purchased_history",
    description: "Get products purchased history for a warehouse",
    inputSchema: {
      type: "object",
      properties: {
        warehouse_id: { type: "number", description: "Warehouse ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day (optional)" },
      },
      required: ["warehouse_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_product_get_returned_history",
    description: "Get products returned history",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day (optional)" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_product_get_purchase_history",
    description: "Get purchase history for a specific product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_get_modifiers",
    description: "Get modifiers for a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_add_modifier",
    description: "Add a modifier to a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        modifier_id: { type: "number", description: "Modifier ID" },
        modifier_price: { type: "number", description: "Modifier price adjustment" },
        is_default: { type: "boolean", description: "Is default modifier" },
      },
      required: ["product_id", "modifier_id"],
    },
  },
  {
    name: "hiboutik_product_remove_modifier",
    description: "Remove a modifier from a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        modifier_id: { type: "number", description: "Modifier ID" },
      },
      required: ["product_id", "modifier_id"],
    },
  },
  {
    name: "hiboutik_product_get_tags",
    description: "Get tags for a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
      },
      required: ["product_id"],
    },
  },
  {
    name: "hiboutik_product_add_tag",
    description: "Add a tag to a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["product_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_product_remove_tag",
    description: "Remove a tag from a product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["product_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_product_get_specific_rules",
    description: "Get specific pricing rules for a product in a store",
    inputSchema: {
      type: "object",
      properties: {
        shop_id: { type: "number", description: "Shop/Store ID" },
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID (0 for default)" },
      },
      required: ["shop_id", "product_id", "size_id"],
    },
  },
  {
    name: "hiboutik_product_set_specific_rules",
    description: "Set specific pricing rules for a product in a store",
    inputSchema: {
      type: "object",
      properties: {
        shop_id: { type: "number", description: "Shop/Store ID" },
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID (0 for default)" },
        specific_price: { type: "number", description: "Specific selling price" },
        specific_supply_price: { type: "number", description: "Specific supply price" },
      },
      required: ["shop_id", "product_id", "size_id"],
    },
  },
  {
    name: "hiboutik_product_generate_barcode",
    description: "Generate a barcode for a product",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        product_id: { type: "number", description: "Product ID" },
        size_id: { type: "number", description: "Size ID (0 for default)" },
      },
      required: ["store_id", "product_id", "size_id"],
    },
  },
];

export async function handleProductTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_product_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      if (params.category_id) query.append("category_id", String(params.category_id));
      if (params.brand_id) query.append("brand_id", String(params.brand_id));
      if (params.supplier_id) query.append("supplier_id", String(params.supplier_id));
      const result = await hiboutikRequest(config, `/products/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get": {
      const result = await hiboutikRequest(config, `/product/${params.product_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_create": {
      const result = await hiboutikFormRequest(config, "/products/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_update": {
      const result = await hiboutikFormRequest(config, `/product/${params.product_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_delete": {
      const result = await hiboutikFormRequest(config, `/products/${params.product_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_search_by_name": {
      const result = await hiboutikRequest(config, `/products/search/name/${encodeURIComponent(String(params.query))}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_search_by_barcode": {
      const result = await hiboutikRequest(config, `/products/search/barcode/${encodeURIComponent(String(params.barcode))}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_search_by_supplier_reference": {
      const result = await hiboutikRequest(config, `/products/search/supplier_reference/${encodeURIComponent(String(params.reference))}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_by_category": {
      const result = await hiboutikRequest(config, `/products/search/category/${params.category_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_by_tax": {
      const result = await hiboutikRequest(config, `/products/search/taxes/${params.tax_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_by_tag": {
      const result = await hiboutikRequest(config, `/products/search/tags/${params.tag_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_open_packages": {
      const result = await hiboutikRequest(config, "/products/search/open_packages");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_sold_history": {
      let endpoint = `/products_sold/${params.store_id}/${params.year}/${params.month}/`;
      if (params.day) endpoint = `/products_sold/${params.store_id}/${params.year}/${params.month}/${params.day}/`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_purchased_history": {
      let endpoint = `/products_purchased/${params.warehouse_id}/${params.year}/${params.month}/`;
      if (params.day) endpoint = `/products_purchased/${params.warehouse_id}/${params.year}/${params.month}/${params.day}/`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_returned_history": {
      let endpoint = `/products_returned/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) endpoint = `/products_returned/${params.store_id}/${params.year}/${params.month}/${params.day}`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_purchase_history": {
      const result = await hiboutikRequest(config, `/product_purchased_history/${params.product_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_modifiers": {
      const result = await hiboutikRequest(config, `/products_modifiers/${params.product_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_add_modifier": {
      const result = await hiboutikFormRequest(config, "/products_modifiers/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_remove_modifier": {
      const result = await hiboutikFormRequest(config, `/products_modifiers/${params.product_id}/${params.modifier_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_tags": {
      const result = await hiboutikRequest(config, `/products_tags/${params.product_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_add_tag": {
      const result = await hiboutikFormRequest(config, "/products_tags/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_remove_tag": {
      const result = await hiboutikFormRequest(config, `/products_tags/${params.product_id}/${params.tag_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_get_specific_rules": {
      const result = await hiboutikRequest(config, `/product_specific_rules/${params.shop_id}/${params.product_id}/${params.size_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_set_specific_rules": {
      const result = await hiboutikFormRequest(config, `/product_specific_rules/${params.shop_id}/${params.product_id}/${params.size_id}`, "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_product_generate_barcode": {
      const result = await hiboutikRequest(config, `/products_barcode/${params.store_id}/${params.product_id}/${params.size_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown product tool: ${name}`);
  }
}
