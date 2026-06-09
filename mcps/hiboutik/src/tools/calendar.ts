import { z } from "zod";
import type { McpServer } from "@mcp-catalog/shared";
import type { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export function registerCalendarTools(
  server: McpServer,
  config: HiboutikConfig,
) {
  server.registerTool(
    "hiboutik_calendar_get_events",
    {
      description: "Get calendar events for a store and date",
      inputSchema: {
        store_id: z.number(),
        year: z.number(),
        month: z.number(),
        day: z.number(),
      },
    },
    async ({ store_id, year, month, day }) => {
      const result = await hiboutikRequest(
        config,
        `/calendar/events/${store_id}/${year}/${month}/${day}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_calendar_get_event",
    {
      description: "Get a specific calendar event",
      inputSchema: { event_id: z.number() },
    },
    async ({ event_id }) => {
      const result = await hiboutikRequest(
        config,
        `/calendar/event/${event_id}`,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_calendar_create_event",
    {
      description: "Create a new calendar event",
      inputSchema: {
        store_id: z.number(),
        event_title: z.string(),
        event_description: z.string().optional(),
        event_start: z.string(),
        event_end: z.string(),
        customer_id: z.number().optional(),
        user_id: z.number().optional(),
        resource_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        "/calendar/events/",
        "POST",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_calendar_update_event",
    {
      description: "Update a calendar event",
      inputSchema: {
        event_id: z.number(),
        event_title: z.string().optional(),
        event_description: z.string().optional(),
        event_start: z.string().optional(),
        event_end: z.string().optional(),
        customer_id: z.number().optional(),
        user_id: z.number().optional(),
        resource_id: z.number().optional(),
      },
    },
    async (params) => {
      const result = await hiboutikFormRequest(
        config,
        `/calendar/events/${params.event_id}/`,
        "PUT",
        params,
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    "hiboutik_calendar_delete_event",
    {
      description: "Delete a calendar event",
      inputSchema: { event_id: z.number() },
    },
    async ({ event_id }) => {
      const result = await hiboutikFormRequest(
        config,
        `/calendar/events/${event_id}/`,
        "DELETE",
      );
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
