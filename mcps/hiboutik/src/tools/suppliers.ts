import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerSupplierTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_supplier_list",
    {
      description: "List all suppliers",
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
        `/suppliers/?${query.toString()}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_supplier_get",
    {
      description: "Get a supplier by ID",
      inputSchema: { supplier_id: z.number() },
    },
    async ({ supplier_id }) => {
      const result = await hiboutikRequest(config, `/suppliers/${supplier_id}`);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_supplier_create",
    {
      description: "Create a new supplier",
      inputSchema: {
        supplier_name: z.string(),
        supplier_email: z.string().optional(),
        supplier_phone: z.string().optional(),
        supplier_address: z.string().optional(),
        supplier_zipcode: z.string().optional(),
        supplier_city: z.string().optional(),
        supplier_country: z.string().optional(),
        supplier_notes: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/suppliers/",
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
    "hiboutik_supplier_update",
    {
      description: "Update an existing supplier",
      inputSchema: {
        supplier_id: z.number(),
        supplier_name: z.string().optional(),
        supplier_email: z.string().optional(),
        supplier_phone: z.string().optional(),
        supplier_address: z.string().optional(),
        supplier_zipcode: z.string().optional(),
        supplier_city: z.string().optional(),
        supplier_country: z.string().optional(),
        supplier_notes: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/suppliers/${params.supplier_id}`,
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
    "hiboutik_supplier_delete",
    {
      description: "Delete a supplier by ID",
      inputSchema: { supplier_id: z.number() },
    },
    async ({ supplier_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/suppliers/${supplier_id}`,
        "DELETE",
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
