import type { McpToolResult } from "./types.js";

/**
 * Build a successful JSON response
 */
export function okJson(data: unknown): McpToolResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Build an error response
 */
export function errorResult(error: unknown): McpToolResult {
  const message =
    error instanceof Error ? error.message : String(error);
  return {
    content: [{ type: "text", text: `Error: ${message}` }],
    isError: true,
  };
}
