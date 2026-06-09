import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerReportTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_report_turnover",
    {
      description: "Get turnover report for a store and date",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async ({ store_id, year, month, day }) => {
      let endpoint = `/reports/turnover/${store_id}/${year}/${month}`;
      if (day) endpoint += `/${day}`;
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_product",
    {
      description: "Get sales report for a specific product",
      inputSchema: {
        product_id: z.number(),
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async ({ product_id, store_id, year, month, day }) => {
      let endpoint = `/reports/product/${product_id}/${store_id}/${year}/${month}`;
      if (day) endpoint += `/${day}`;
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_products",
    {
      description: "Get products sales report for a store and month",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/reports/products/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_products_tags",
    {
      description: "Get products sales by tags report",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/reports/products_tags/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_sales_by_tag",
    {
      description: "Get sales report filtered by tag",
      inputSchema: {
        tag_id: z.number(),
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async ({ tag_id, store_id, year, month, day }) => {
      let endpoint = `/reports/sales_by_tag/${tag_id}/${store_id}/${year}/${month}`;
      if (day) endpoint += `/${day}`;
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_categories",
    {
      description: "Get sales report by categories",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/reports/categories/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_brands",
    {
      description: "Get sales report by brands",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/reports/brands/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_suppliers",
    {
      description: "Get sales report by suppliers",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ store_id, year, month }) => {
      const result = await hiboutikRequest(
        config,
        `/reports/suppliers/${store_id}/${year}/${month}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_sales_per_customer",
    {
      description: "Get sales per customer report",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number().optional(),
      },
    },
    async ({ store_id, year, month, day }) => {
      let endpoint = `/reports/sales_per_customer/${store_id}/${year}/${month}`;
      if (day) endpoint += `/${day}`;
      const result = await hiboutikRequest(config, endpoint);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_refresh_supply_prices",
    { description: "Refresh supply prices report data" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/reports/refresh/supply_prices",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_refresh_customers",
    { description: "Refresh customers report data" },
    async () => {
      const result = await hiboutikFormRequest(
        config,
        "/reports/refresh/customers",
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_report_refresh_stats",
    {
      description: "Refresh statistics for a month",
      inputSchema: {
        year: z.number(),
        month: z.number(),
      },
    },
    async ({ year, month }) => {
      const result = await hiboutikFormRequest(
        config,
        `/reports/refresh/stats/${year}/${month}`,
        "POST",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
