import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const reportTools: Tool[] = [
  {
    name: "hiboutik_report_turnover",
    description: "Get turnover report for a store and date",
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
    name: "hiboutik_report_product",
    description: "Get sales report for a specific product",
    inputSchema: {
      type: "object",
      properties: {
        product_id: { type: "number", description: "Product ID" },
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day (optional)" },
      },
      required: ["product_id", "store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_products",
    description: "Get products sales report for a store and month",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_products_tags",
    description: "Get products sales by tags report",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_sales_by_tag",
    description: "Get sales report filtered by tag",
    inputSchema: {
      type: "object",
      properties: {
        tag_id: { type: "number", description: "Tag ID" },
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day (optional)" },
      },
      required: ["tag_id", "store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_categories",
    description: "Get sales report by categories",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_brands",
    description: "Get sales report by brands",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_suppliers",
    description: "Get sales report by suppliers",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["store_id", "year", "month"],
    },
  },
  {
    name: "hiboutik_report_sales_per_customer",
    description: "Get sales per customer report",
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
    name: "hiboutik_report_refresh_supply_prices",
    description: "Refresh supply prices report data",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_report_refresh_customers",
    description: "Refresh customers report data",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_report_refresh_stats",
    description: "Refresh statistics for a month",
    inputSchema: {
      type: "object",
      properties: {
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
      },
      required: ["year", "month"],
    },
  },
];

export async function handleReportTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_report_turnover": {
      let endpoint = `/reports/turnover/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) endpoint += `/${params.day}`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_product": {
      let endpoint = `/reports/product/${params.product_id}/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) endpoint += `/${params.day}`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_products": {
      const result = await hiboutikRequest(config, `/reports/products/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_products_tags": {
      const result = await hiboutikRequest(config, `/reports/products_tags/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_sales_by_tag": {
      let endpoint = `/reports/sales_by_tag/${params.tag_id}/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) endpoint += `/${params.day}`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_categories": {
      const result = await hiboutikRequest(config, `/reports/categories/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_brands": {
      const result = await hiboutikRequest(config, `/reports/brands/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_suppliers": {
      const result = await hiboutikRequest(config, `/reports/suppliers/${params.store_id}/${params.year}/${params.month}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_sales_per_customer": {
      let endpoint = `/reports/sales_per_customer/${params.store_id}/${params.year}/${params.month}`;
      if (params.day) endpoint += `/${params.day}`;
      const result = await hiboutikRequest(config, endpoint);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_refresh_supply_prices": {
      const result = await hiboutikFormRequest(config, "/reports/refresh/supply_prices", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_refresh_customers": {
      const result = await hiboutikFormRequest(config, "/reports/refresh/customers", "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_report_refresh_stats": {
      const result = await hiboutikFormRequest(config, `/reports/refresh/stats/${params.year}/${params.month}`, "POST");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown report tool: ${name}`);
  }
}
