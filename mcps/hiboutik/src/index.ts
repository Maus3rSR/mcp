#!/usr/bin/env node

import { startMcpServer } from "@mcp-catalog/shared";
import type { ToolRegistrar } from "@mcp-catalog/shared";

// Import tool registrars
import { registerCustomerTools } from "./tools/customers.js";
import { registerProductTools } from "./tools/products.js";
import { registerSaleTools } from "./tools/sales.js";
import { registerInventoryTools } from "./tools/inventory.js";
import { registerReportTools } from "./tools/reports.js";
import { registerStockTools } from "./tools/stock.js";
import { registerTagTools } from "./tools/tags.js";
import { registerCategoryTools } from "./tools/categories.js";
import { registerSupplierTools } from "./tools/suppliers.js";
import { registerBrandTools } from "./tools/brands.js";
import { registerCalendarTools } from "./tools/calendar.js";
import { registerKitchenTools } from "./tools/kitchen.js";
import { registerTillTools } from "./tools/till.js";
import { registerTimeTrackingTools } from "./tools/time-tracking.js";
import { registerWebhookTools } from "./tools/webhooks.js";
import { registerUserTools } from "./tools/users.js";
import { registerSizeTools } from "./tools/sizes.js";
import { registerStoreTools } from "./tools/stores.js";
import { registerActionLinkTools } from "./tools/action-links.js";
import { registerPaymentTools } from "./tools/payments.js";
import { registerModifierTools } from "./tools/modifiers.js";
import { registerCreditNoteTools } from "./tools/credit-notes.js";
import { registerSearchTools } from "./tools/search.js";
import { registerOtherTools } from "./tools/others.js";

// Hiboutik API configuration
const HIBOUTIK_BASE_URL = process.env.HIBOUTIK_BASE_URL || "";
const HIBOUTIK_USER = process.env.HIBOUTIK_USER || "";
const HIBOUTIK_API_KEY = process.env.HIBOUTIK_API_KEY || "";

if (!HIBOUTIK_BASE_URL || !HIBOUTIK_USER || !HIBOUTIK_API_KEY) {
  console.error("Missing required environment variables. Please set:");
  console.error(
    "  - HIBOUTIK_BASE_URL (e.g., https://youraccount.hiboutik.com/api)",
  );
  console.error("  - HIBOUTIK_USER");
  console.error("  - HIBOUTIK_API_KEY");
  process.exit(1);
}

const TRANSPORT = (process.env.TRANSPORT || "stdio") as "stdio" | "http";
const PORT = parseInt(process.env.PORT || "3000", 10);
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN || undefined;

export interface HiboutikConfig {
  baseUrl: string;
  user: string;
  apiKey: string;
}

const config: HiboutikConfig = {
  baseUrl: HIBOUTIK_BASE_URL,
  user: HIBOUTIK_USER,
  apiKey: HIBOUTIK_API_KEY,
};

// Compose all tool registrars
const registerTools: ToolRegistrar<HiboutikConfig> = (server, cfg) => {
  registerCustomerTools(server, cfg);
  registerProductTools(server, cfg);
  registerSaleTools(server, cfg);
  registerInventoryTools(server, cfg);
  registerReportTools(server, cfg);
  registerStockTools(server, cfg);
  registerTagTools(server, cfg);
  registerCategoryTools(server, cfg);
  registerSupplierTools(server, cfg);
  registerBrandTools(server, cfg);
  registerCalendarTools(server, cfg);
  registerKitchenTools(server, cfg);
  registerTillTools(server, cfg);
  registerTimeTrackingTools(server, cfg);
  registerWebhookTools(server, cfg);
  registerUserTools(server, cfg);
  registerSizeTools(server, cfg);
  registerStoreTools(server, cfg);
  registerActionLinkTools(server, cfg);
  registerPaymentTools(server, cfg);
  registerModifierTools(server, cfg);
  registerCreditNoteTools(server, cfg);
  registerSearchTools(server, cfg);
  registerOtherTools(server, cfg);
};

startMcpServer({
  name: "mcp-hiboutik",
  version: "1.0.0",
  config,
  registerTools,
  transport: TRANSPORT,
  port: PORT,
  authToken: AUTH_TOKEN,
}).catch(console.error);
