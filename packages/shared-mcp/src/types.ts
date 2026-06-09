import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Standard MCP tool call result — alias of the SDK's CallToolResult
 */
export type McpToolResult = CallToolResult;

/**
 * Tool registration function — registers tools with an McpServer instance
 */
export type ToolRegistrar<TConfig> = (
  server: McpServer,
  config: TConfig,
) => void;

export type { CallToolResult, McpServer };
