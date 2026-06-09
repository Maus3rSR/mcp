import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerActionLinkTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_action_link_list",
    { description: "List all action links/buttons" },
    async () => {
      const result = await hiboutikRequest(config, "/action_links");
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_action_link_get",
    {
      description: "Get an action link by ID",
      inputSchema: { action_link_id: z.number() },
    },
    async ({ action_link_id }) => {
      const result = await hiboutikRequest(
        config,
        `/action_links/${action_link_id}`,
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_action_link_create",
    {
      description: "Create a new action link/button",
      inputSchema: {
        action_link_label: z.string(),
        action_link_location: z.string(),
        action_link_url: z.string(),
        action_link_type: z.string().optional(),
        action_link_target: z.string().optional(),
        action_link_store_id: z.number().optional(),
        action_link_user_id: z.number().optional(),
        app_link_id: z.string().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/action_links/",
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
    "hiboutik_action_link_update",
    {
      description: "Update an action link",
      inputSchema: {
        action_link_id: z.number(),
        action_link_label: z.string().optional(),
        action_link_location: z.string().optional(),
        action_link_url: z.string().optional(),
        action_link_type: z.string().optional(),
        action_link_target: z.string().optional(),
        action_link_store_id: z.number().optional(),
        action_link_user_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/action_links/${params.action_link_id}`,
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
    "hiboutik_action_link_delete",
    {
      description: "Delete an action link",
      inputSchema: { action_link_id: z.number() },
    },
    async ({ action_link_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/action_links/${action_link_id}`,
        "DELETE",
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );

  server.registerTool(
    "hiboutik_action_link_exec",
    {
      description: "Execute an action link",
      inputSchema: {
        action_link_id: z.number(),
        context_data: z.record(z.string(), z.unknown()).optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/action_link_exec/",
        "POST",
        {
          action_link_id: params.action_link_id,
          ...(params.context_data || {}),
        },
      );
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(result, null, 2) },
        ],
      };
    },
  );
}
