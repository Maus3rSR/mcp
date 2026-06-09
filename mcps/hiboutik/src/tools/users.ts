import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerUserTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_user_list",
    {
      description: "List all users/employees",
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
        `/users?${query.toString()}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_user_change_password",
    {
      description: "Change user password",
      inputSchema: {
        old_password: z.string(),
        new_password: z.string(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/user/password",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_user_auth",
    {
      description: "Authenticate a user and get session info",
      inputSchema: {
        user_name: z.string(),
        user_password: z.string(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/user/auth",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
