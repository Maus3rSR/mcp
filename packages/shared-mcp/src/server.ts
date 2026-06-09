import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { ToolRegistrar } from "./types.js";

export interface McpServerOptions<TConfig> {
  name: string;
  version: string;
  config: TConfig;
  registerTools: ToolRegistrar<TConfig>;
}

/**
 * Bootstrap an MCP server with stdio transport.
 * Uses the high-level McpServer API for simplified tool registration.
 */
export async function startMcpServer<TConfig>(
  options: McpServerOptions<TConfig>,
): Promise<void> {
  const { name, version, config, registerTools } = options;

  const server = new McpServer({ name, version });

  // Register all tools with the server
  registerTools(server, config);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
