import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const customerTools: Tool[] = [
  {
    name: "hiboutik_customer_list",
    description: "List all customers with optional pagination",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        limit: { type: "number", description: "Number of results per page" },
      },
    },
  },
  {
    name: "hiboutik_customer_get",
    description: "Get a customer by ID",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_create",
    description: "Create a new customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_lastname: { type: "string", description: "Customer last name" },
        customer_firstname: { type: "string", description: "Customer first name" },
        customer_email: { type: "string", description: "Customer email" },
        customer_phone: { type: "string", description: "Customer phone number" },
        customer_address: { type: "string", description: "Customer address" },
        customer_zipcode: { type: "string", description: "Customer zip code" },
        customer_city: { type: "string", description: "Customer city" },
        customer_country: { type: "string", description: "Customer country" },
        customer_birthday: { type: "string", description: "Customer birthday (YYYY-MM-DD)" },
        customer_notes: { type: "string", description: "Customer notes" },
        customer_loyalty_points: { type: "number", description: "Loyalty points" },
        customer_credit: { type: "number", description: "Customer credit amount" },
        customer_newsletter: { type: "boolean", description: "Newsletter subscription" },
        customer_optin: { type: "boolean", description: "Opt-in for marketing" },
      },
      required: ["customer_lastname"],
    },
  },
  {
    name: "hiboutik_customer_update",
    description: "Update an existing customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
        customer_lastname: { type: "string", description: "Customer last name" },
        customer_firstname: { type: "string", description: "Customer first name" },
        customer_email: { type: "string", description: "Customer email" },
        customer_phone: { type: "string", description: "Customer phone number" },
        customer_address: { type: "string", description: "Customer address" },
        customer_zipcode: { type: "string", description: "Customer zip code" },
        customer_city: { type: "string", description: "Customer city" },
        customer_country: { type: "string", description: "Customer country" },
        customer_birthday: { type: "string", description: "Customer birthday (YYYY-MM-DD)" },
        customer_notes: { type: "string", description: "Customer notes" },
        customer_loyalty_points: { type: "number", description: "Loyalty points" },
        customer_credit: { type: "number", description: "Customer credit amount" },
        customer_newsletter: { type: "boolean", description: "Newsletter subscription" },
        customer_optin: { type: "boolean", description: "Opt-in for marketing" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_delete",
    description: "Delete a customer by ID",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_get_sales",
    description: "Get all sales for a specific customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_get_products_sold",
    description: "Get all products sold to a specific customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_get_credit",
    description: "Get customer credit balance",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_update_credit",
    description: "Update customer credit (add credit or payment)",
    inputSchema: {
      type: "object",
      properties: {
        customers_id: { type: "number", description: "Customer ID" },
        customers_credit_amount: { type: "number", description: "Credit amount (positive to add, negative to remove)" },
        customers_credit_note: { type: "string", description: "Credit note/description" },
      },
      required: ["customers_id", "customers_credit_amount"],
    },
  },
  {
    name: "hiboutik_customer_get_addresses",
    description: "Get all addresses for a customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
    },
  },
  {
    name: "hiboutik_customer_create_address",
    description: "Create a new address for a customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
        address_type: { type: "string", description: "Address type (billing, shipping)" },
        address_name: { type: "string", description: "Address name" },
        address_address: { type: "string", description: "Street address" },
        address_zipcode: { type: "string", description: "Zip code" },
        address_city: { type: "string", description: "City" },
        address_country: { type: "string", description: "Country" },
        address_phone: { type: "string", description: "Phone number" },
      },
      required: ["customer_id", "address_type", "address_address", "address_zipcode", "address_city"],
    },
  },
  {
    name: "hiboutik_customer_update_address",
    description: "Update an existing customer address",
    inputSchema: {
      type: "object",
      properties: {
        address_id: { type: "number", description: "Address ID" },
        address_type: { type: "string", description: "Address type (billing, shipping)" },
        address_name: { type: "string", description: "Address name" },
        address_address: { type: "string", description: "Street address" },
        address_zipcode: { type: "string", description: "Zip code" },
        address_city: { type: "string", description: "City" },
        address_country: { type: "string", description: "Country" },
        address_phone: { type: "string", description: "Phone number" },
      },
      required: ["address_id"],
    },
  },
  {
    name: "hiboutik_customer_delete_address",
    description: "Delete a customer address",
    inputSchema: {
      type: "object",
      properties: {
        address_id: { type: "number", description: "Address ID" },
      },
      required: ["address_id"],
    },
  },
  {
    name: "hiboutik_customer_merge",
    description: "Merge two customers (source into target)",
    inputSchema: {
      type: "object",
      properties: {
        source_customer_id: { type: "number", description: "Source customer ID (to be merged)" },
        target_customer_id: { type: "number", description: "Target customer ID (to keep)" },
      },
      required: ["source_customer_id", "target_customer_id"],
    },
  },
  {
    name: "hiboutik_customer_get_birthday_list",
    description: "Get customers with birthdays on a specific date",
    inputSchema: {
      type: "object",
      properties: {
        month: { type: "number", description: "Month (1-12)" },
        day: { type: "number", description: "Day (1-31)" },
      },
      required: ["month", "day"],
    },
  },
  {
    name: "hiboutik_customer_get_lists",
    description: "Get all customer lists",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "hiboutik_customer_get_list",
    description: "Get a specific customer list by ID",
    inputSchema: {
      type: "object",
      properties: {
        list_id: { type: "number", description: "List ID" },
      },
      required: ["list_id"],
    },
  },
  {
    name: "hiboutik_customer_get_tags",
    description: "Get tags for a specific customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_add_tag",
    description: "Add a tag to a customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["customer_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_customer_remove_tag",
    description: "Remove a tag from a customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
        tag_id: { type: "number", description: "Tag ID" },
      },
      required: ["customer_id", "tag_id"],
    },
  },
  {
    name: "hiboutik_customer_get_time_tracking",
    description: "Get time tracking entries for a customer",
    inputSchema: {
      type: "object",
      properties: {
        customer_id: { type: "number", description: "Customer ID" },
      },
      required: ["customer_id"],
    },
  },
  {
    name: "hiboutik_customer_count",
    description: "Get the total number of customers",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleCustomerTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_customer_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/customers/?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get": {
      const result = await hiboutikRequest(config, `/customer/${params.customer_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_create": {
      const result = await hiboutikFormRequest(config, "/customers/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_update": {
      const result = await hiboutikFormRequest(config, `/customer/${params.customer_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_delete": {
      const result = await hiboutikFormRequest(config, `/customer/${params.customer_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_sales": {
      const result = await hiboutikRequest(config, `/customer/${params.customer_id}/sales/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_products_sold": {
      const result = await hiboutikRequest(config, `/customer/${params.customer_id}/products_solds/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_credit": {
      const result = await hiboutikRequest(config, `/customers_credit/${params.customer_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_update_credit": {
      const result = await hiboutikFormRequest(config, "/customers_credit/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_addresses": {
      const query = new URLSearchParams();
      if (params.customer_id) query.append("customer_id", String(params.customer_id));
      const result = await hiboutikRequest(config, `/customers_addresses?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_create_address": {
      const result = await hiboutikFormRequest(config, "/customers_addresses", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_update_address": {
      const result = await hiboutikFormRequest(config, `/customers_addresses/${params.address_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_delete_address": {
      const result = await hiboutikFormRequest(config, `/customers_addresses/${params.address_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_merge": {
      const result = await hiboutikFormRequest(config, "/customers_merge/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_birthday_list": {
      const result = await hiboutikRequest(config, `/customers_birthday/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_lists": {
      const result = await hiboutikRequest(config, "/customers/lists/");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_list": {
      const result = await hiboutikRequest(config, `/customers/lists/${params.list_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_tags": {
      const result = await hiboutikRequest(config, `/customers_tags/${params.customer_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_add_tag": {
      const result = await hiboutikFormRequest(config, "/customers_tags/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_remove_tag": {
      const result = await hiboutikFormRequest(config, `/customers_tags/${params.customer_id}/${params.tag_id}`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_get_time_tracking": {
      const result = await hiboutikRequest(config, `/customers_time_tracking/${params.customer_id}/`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_customer_count": {
      const result = await hiboutikRequest(config, "/number_of_customers");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown customer tool: ${name}`);
  }
}
