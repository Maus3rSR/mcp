import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import type { ToolRegistrar } from "./types.js";

export interface McpServerOptions<TConfig> {
  name: string;
  version: string;
  config: TConfig;
  registerTools: ToolRegistrar<TConfig>;
  /** Transport mode: "stdio" (default) or "http" */
  transport?: "stdio" | "http";
  /** HTTP port when transport is "http" (default: 3000) */
  port?: number;
}

/**
 * Bootstrap an MCP server with stdio or HTTP transport.
 * Uses the high-level McpServer API for simplified tool registration.
 */
export async function startMcpServer<TConfig>(
  options: McpServerOptions<TConfig>,
): Promise<void> {
  const {
    name,
    version,
    config,
    registerTools,
    transport: transportMode = "stdio",
    port = 3000,
  } = options;

  if (transportMode === "http") {
    await startHttpServer({ name, version, config, registerTools, port });
  } else {
    await startStdioServer({ name, version, config, registerTools });
  }
}

async function startStdioServer<TConfig>({
  name,
  version,
  config,
  registerTools,
}: Pick<
  McpServerOptions<TConfig>,
  "name" | "version" | "config" | "registerTools"
>): Promise<void> {
  const server = new McpServer({ name, version });
  registerTools(server, config);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function startHttpServer<TConfig>({
  name,
  version,
  config,
  registerTools,
  port,
}: Pick<
  McpServerOptions<TConfig>,
  "name" | "version" | "config" | "registerTools" | "port"
>): Promise<void> {
  // Map of active transports keyed by session ID
  const transports = new Map<string, StreamableHTTPServerTransport>();

  const httpServer = createServer(async (req, res) => {
    // Only handle /mcp endpoint
    if (req.url !== "/mcp") {
      res.writeHead(404).end("Not found");
      return;
    }

    if (req.method === "POST") {
      // Parse request body
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : undefined;

      const sessionId = req.headers["mcp-session-id"] as string | undefined;

      try {
        let transport: StreamableHTTPServerTransport;

        if (sessionId && transports.has(sessionId)) {
          // Reuse existing session transport
          transport = transports.get(sessionId)!;
        } else if (!sessionId && isInitializeRequest(body)) {
          // New session — create a fresh McpServer + transport pair
          const server = new McpServer({ name, version });
          registerTools(server, config);

          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sid) => {
              transports.set(sid, transport);
            },
          });

          transport.onclose = () => {
            const sid = transport.sessionId;
            if (sid) transports.delete(sid);
          };

          await server.connect(transport);
          await transport.handleRequest(req, res, body);
          return;
        } else {
          res.writeHead(400).end(
            JSON.stringify({
              jsonrpc: "2.0",
              error: { code: -32000, message: "Bad Request: missing or invalid session" },
              id: null,
            }),
          );
          return;
        }

        await transport.handleRequest(req, res, body);
      } catch (err) {
        console.error("Error handling MCP POST:", err);
        if (!res.headersSent) {
          res.writeHead(500).end(
            JSON.stringify({
              jsonrpc: "2.0",
              error: { code: -32603, message: "Internal server error" },
              id: null,
            }),
          );
        }
      }
      return;
    }

    if (req.method === "GET") {
      const sessionId = req.headers["mcp-session-id"] as string | undefined;
      if (!sessionId || !transports.has(sessionId)) {
        res.writeHead(400).end("Invalid or missing session ID");
        return;
      }
      await transports.get(sessionId)!.handleRequest(req, res);
      return;
    }

    if (req.method === "DELETE") {
      const sessionId = req.headers["mcp-session-id"] as string | undefined;
      if (!sessionId || !transports.has(sessionId)) {
        res.writeHead(400).end("Invalid or missing session ID");
        return;
      }
      await transports.get(sessionId)!.handleRequest(req, res);
      return;
    }

    res.writeHead(405).end("Method not allowed");
  });

  httpServer.listen(port, () => {
    console.error(`MCP HTTP server listening on port ${port}`);
  });

  // Graceful shutdown
  process.on("SIGINT", async () => {
    console.error("Shutting down MCP HTTP server...");
    for (const [sid, transport] of transports) {
      try {
        await transport.close();
        transports.delete(sid);
      } catch {
        // ignore close errors
      }
    }
    httpServer.close(() => process.exit(0));
  });
}
