import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const userTools: Tool[] = [
  {
    name: "hiboutik_user_list",
    description: "List all users/employees",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number" },
        limit: { type: "number", description: "Results per page" },
      },
    },
  },
  {
    name: "hiboutik_user_change_password",
    description: "Change user password",
    inputSchema: {
      type: "object",
      properties: {
        old_password: { type: "string", description: "Current password" },
        new_password: { type: "string", description: "New password" },
      },
      required: ["old_password", "new_password"],
    },
  },
  {
    name: "hiboutik_user_auth",
    description: "Authenticate a user and get session info",
    inputSchema: {
      type: "object",
      properties: {
        user_name: { type: "string", description: "Username" },
        user_password: { type: "string", description: "Password" },
      },
      required: ["user_name", "user_password"],
    },
  },
];

export async function handleUserTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_user_list": {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      const result = await hiboutikRequest(config, `/users?${query.toString()}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_user_change_password": {
      const result = await hiboutikFormRequest(config, "/user/password", "POST", {
        old_password: params.old_password,
        new_password: params.new_password,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_user_auth": {
      const result = await hiboutikFormRequest(config, "/user/auth", "POST", {
        user_name: params.user_name,
        user_password: params.user_password,
      });
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown user tool: ${name}`);
  }
}
