import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { HiboutikConfig } from "../index.js";
import { hiboutikRequest, hiboutikFormRequest } from "../api/client.js";

export const calendarTools: Tool[] = [
  {
    name: "hiboutik_calendar_get_events",
    description: "Get calendar events for a store and date",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        year: { type: "number", description: "Year" },
        month: { type: "number", description: "Month" },
        day: { type: "number", description: "Day" },
      },
      required: ["store_id", "year", "month", "day"],
    },
  },
  {
    name: "hiboutik_calendar_get_event",
    description: "Get a specific calendar event",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "number", description: "Event ID" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "hiboutik_calendar_create_event",
    description: "Create a new calendar event",
    inputSchema: {
      type: "object",
      properties: {
        store_id: { type: "number", description: "Store ID" },
        event_title: { type: "string", description: "Event title" },
        event_description: { type: "string", description: "Event description" },
        event_start: { type: "string", description: "Start datetime (YYYY-MM-DD HH:MM:SS)" },
        event_end: { type: "string", description: "End datetime (YYYY-MM-DD HH:MM:SS)" },
        customer_id: { type: "number", description: "Linked customer ID" },
        user_id: { type: "number", description: "Assigned user ID" },
        resource_id: { type: "number", description: "Resource ID" },
      },
      required: ["store_id", "event_title", "event_start", "event_end"],
    },
  },
  {
    name: "hiboutik_calendar_update_event",
    description: "Update a calendar event",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "number", description: "Event ID" },
        event_title: { type: "string", description: "Event title" },
        event_description: { type: "string", description: "Event description" },
        event_start: { type: "string", description: "Start datetime" },
        event_end: { type: "string", description: "End datetime" },
        customer_id: { type: "number", description: "Linked customer ID" },
        user_id: { type: "number", description: "Assigned user ID" },
        resource_id: { type: "number", description: "Resource ID" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "hiboutik_calendar_delete_event",
    description: "Delete a calendar event",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "number", description: "Event ID" },
      },
      required: ["event_id"],
    },
  },
];

export async function handleCalendarTool(
  name: string,
  args: Record<string, unknown> | undefined,
  config: HiboutikConfig
) {
  const params = args || {};

  switch (name) {
    case "hiboutik_calendar_get_events": {
      const result = await hiboutikRequest(config, `/calendar/events/${params.store_id}/${params.year}/${params.month}/${params.day}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_calendar_get_event": {
      const result = await hiboutikRequest(config, `/calendar/event/${params.event_id}`);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_calendar_create_event": {
      const result = await hiboutikFormRequest(config, "/calendar/events/", "POST", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_calendar_update_event": {
      const result = await hiboutikFormRequest(config, `/calendar/events/${params.event_id}/`, "PUT", params);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    case "hiboutik_calendar_delete_event": {
      const result = await hiboutikFormRequest(config, `/calendar/events/${params.event_id}/`, "DELETE");
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    default:
      throw new Error(`Unknown calendar tool: ${name}`);
  }
}
