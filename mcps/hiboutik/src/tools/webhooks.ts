import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerWebhookTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_webhook_list",
    {
      description: "List all webhooks",
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
        `/webhooks?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_webhook_get",
    {
      description: "Get a webhook by ID",
      inputSchema: { webhook_id: z.number() },
    },
    async ({ webhook_id }) => {
      const result = await hiboutikRequest(config, `/webhooks/${webhook_id}`);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_webhook_create",
    {
      description: "Create a new webhook",
      inputSchema: {
        webhook_url: z.string(),
        webhook_event: z.string(),
        webhook_active: z.boolean().optional(),
        webhook_secret: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/webhooks/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_webhook_update",
    {
      description: "Update a webhook",
      inputSchema: {
        webhook_id: z.number(),
        webhook_url: z.string().optional(),
        webhook_event: z.string().optional(),
        webhook_active: z.boolean().optional(),
        webhook_secret: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/webhooks/${params.webhook_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_webhook_delete",
    {
      description: "Delete a webhook",
      inputSchema: { webhook_id: z.number() },
    },
    async ({ webhook_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/webhooks/${webhook_id}`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
