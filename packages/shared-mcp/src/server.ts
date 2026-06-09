import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import type { ToolHandler } from "./types.js";

export interface McpServerOptions<TConfig> {
  name: string;
  version: string;
  tools: Tool[];
  handler: ToolHandler<TConfig>;
  config: TConfig;
}

/**
 * Bootstrap an MCP server with stdio transport.
 * Registers all tools and routes call_tool requests to the provided handler.
 */
export async function startMcpServer<TConfig>(
  options: McpServerOptions<TConfig>,
): Promise<void> {
  const { name, version, tools, handler, config } = options;

  const server = new Server({ name, version }, { capabilities: { tools: {} } });

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: toolName, arguments: args } = request.params;
    try {
      return await handler(
        toolName,
        args as Record<string, unknown> | undefined,
        config,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: "text" as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
