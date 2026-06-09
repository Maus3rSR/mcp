import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const supplierTools: Tool[] = [
  {
    name: "hiboutik_supplier_list",
    description: "List all suppliers",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_supplier_get",
    description: "Get a supplier by ID",
    inputSchema: {
      type: "object",
      properties: {
        supplier_id: { type: "number", description: "Supplier ID" },
      },
      required: ["supplier_id"],
    },
  },
  {
    name: "hiboutik_supplier_create",
    description: "Create a new supplier",
    inputSchema: {
      type: "object",
      properties: {
        supplier_name: { type: "string", description: "Supplier name" },
        supplier_email: { type: "string", description: "Supplier email" },
        supplier_phone: { type: "string", description: "Supplier phone" },
        supplier_address: { type: "string", description: "Supplier address" },
        supplier_zipcode: { type: "string", description: "Zip code" },
        supplier_city: { type: "string", description: "City" },
        supplier_country: { type: "string", description: "Country" },
        supplier_notes: { type: "string", description: "Notes" },
      },
      required: ["supplier_name"],
    },
  },
  {
    name: "hiboutik_supplier_update",
    description: "Update an existing supplier",
    inputSchema: {
      type: "object",
      properties: {
        supplier_id: { type: "number", description: "Supplier ID" },
        supplier_name: { type: "string", description: "Supplier name" },
        supplier_email: { type: "string", description: "Supplier email" },
        supplier_phone: { type: "string", description: "Supplier phone" },
        supplier_address: { type: "string", description: "Supplier address" },
        supplier_zipcode: { type: "string", description: "Zip code" },
        supplier_city: { type: "string", description: "City" },
        supplier_country: { type: "string", description: "Country" },
        supplier_notes: { type: "string", description: "Notes" },
      },
      required: ["supplier_id"],
    },
  },
  {
    name: "hiboutik_supplier_delete",
    description: "Delete a supplier by ID",
    inputSchema: {
      type: "object",
      properties: {
        supplier_id: { type: "number", description: "Supplier ID" },
      },
      required: ["supplier_id"],
    },
  },
];

export async function handleSupplierTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_supplier_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/suppliers/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_supplier_get": {
      const result = await hiboutikRequest(config, `/suppliers/${params.supplier_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_supplier_create": {
      const result = await hiboutikFormRequest(config, "/suppliers/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_supplier_update": {
      const result = await hiboutikFormRequest(config, `/suppliers/${params.supplier_id}`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_supplier_delete": {
      const result = await hiboutikFormRequest(config, `/suppliers/${params.supplier_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown supplier tool: ${name}`);
  }
}
