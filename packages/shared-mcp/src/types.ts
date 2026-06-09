import type { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Standard MCP tool call result — alias of the SDK's CallToolResult
 */
export type McpToolResult = CallToolResult;

/**
 * Generic tool handler function signature
 */
export type ToolHandler<TConfig> = (
  name: string,
  args: Record<string, unknown> | undefined,
  config: TConfig,
) => Promise<McpToolResult>;

export type { Tool, CallToolResult };
