#!/usr/bin/env node

import { startMcpServer } from "@mcp-catalog/shared";
import type { Tool, ToolHandler } from "@mcp-catalog/shared";

// Import tool definitions
import { customerTools, handleCustomerTool } from "./tools/customers.js";
import { productTools, handleProductTool } from "./tools/products.js";
import { saleTools, handleSaleTool } from "./tools/sales.js";
import { inventoryTools, handleInventoryTool } from "./tools/inventory.js";
import { reportTools, handleReportTool } from "./tools/reports.js";
import { stockTools, handleStockTool } from "./tools/stock.js";
import { tagTools, handleTagTool } from "./tools/tags.js";
import { categoryTools, handleCategoryTool } from "./tools/categories.js";
import { supplierTools, handleSupplierTool } from "./tools/suppliers.js";
import { brandTools, handleBrandTool } from "./tools/brands.js";
import { calendarTools, handleCalendarTool } from "./tools/calendar.js";
import { kitchenTools, handleKitchenTool } from "./tools/kitchen.js";
import { tillTools, handleTillTool } from "./tools/till.js";
import {
  timeTrackingTools,
  handleTimeTrackingTool,
} from "./tools/time-tracking.js";
import { webhookTools, handleWebhookTool } from "./tools/webhooks.js";
import { userTools, handleUserTool } from "./tools/users.js";
import { sizeTools, handleSizeTool } from "./tools/sizes.js";
import { storeTools, handleStoreTool } from "./tools/stores.js";
import { actionLinkTools, handleActionLinkTool } from "./tools/action-links.js";
import { paymentTools, handlePaymentTool } from "./tools/payments.js";
import { modifierTools, handleModifierTool } from "./tools/modifiers.js";
import { creditNoteTools, handleCreditNoteTool } from "./tools/credit-notes.js";
import { searchTools, handleSearchTool } from "./tools/search.js";
import { otherTools, handleOtherTool } from "./tools/others.js";

// Hiboutik API configuration
const HIBOUTIK_BASE_URL = process.env.HIBOUTIK_BASE_URL || "";
const HIBOUTIK_ACCOUNT = process.env.HIBOUTIK_ACCOUNT || "";
const HIBOUTIK_USER = process.env.HIBOUTIK_USER || "";
const HIBOUTIK_API_KEY = process.env.HIBOUTIK_API_KEY || "";

if (
  !HIBOUTIK_BASE_URL ||
  !HIBOUTIK_ACCOUNT ||
  !HIBOUTIK_USER ||
  !HIBOUTIK_API_KEY
) {
  console.error("Missing required environment variables. Please set:");
  console.error(
    "  - HIBOUTIK_BASE_URL (e.g., https://youraccount.hiboutik.com/api)",
  );
  console.error("  - HIBOUTIK_ACCOUNT");
  console.error("  - HIBOUTIK_USER");
  console.error("  - HIBOUTIK_API_KEY");
  process.exit(1);
}

export interface HiboutikConfig {
  baseUrl: string;
  account: string;
  user: string;
  apiKey: string;
}

const config: HiboutikConfig = {
  baseUrl: HIBOUTIK_BASE_URL,
  account: HIBOUTIK_ACCOUNT,
  user: HIBOUTIK_USER,
  apiKey: HIBOUTIK_API_KEY,
};

// Combine all tools
const allTools: Tool[] = [
  ...customerTools,
  ...productTools,
  ...saleTools,
  ...inventoryTools,
  ...reportTools,
  ...stockTools,
  ...tagTools,
  ...categoryTools,
  ...supplierTools,
  ...brandTools,
  ...calendarTools,
  ...kitchenTools,
  ...tillTools,
  ...timeTrackingTools,
  ...webhookTools,
  ...userTools,
  ...sizeTools,
  ...storeTools,
  ...actionLinkTools,
  ...paymentTools,
  ...modifierTools,
  ...creditNoteTools,
  ...searchTools,
  ...otherTools,
];

async function handler(
  name: string,
  args: Record<string, unknown> | undefined,
  cfg: HiboutikConfig,
) {
  if (name.startsWith("hiboutik_customer"))
    return handleCustomerTool(name, args, cfg);
  if (name.startsWith("hiboutik_product"))
    return handleProductTool(name, args, cfg);
  if (name.startsWith("hiboutik_sale")) return handleSaleTool(name, args, cfg);
  if (name.startsWith("hiboutik_inventory"))
    return handleInventoryTool(name, args, cfg);
  if (name.startsWith("hiboutik_report"))
    return handleReportTool(name, args, cfg);
  if (name.startsWith("hiboutik_stock"))
    return handleStockTool(name, args, cfg);
  if (name.startsWith("hiboutik_tag")) return handleTagTool(name, args, cfg);
  if (name.startsWith("hiboutik_category"))
    return handleCategoryTool(name, args, cfg);
  if (name.startsWith("hiboutik_supplier"))
    return handleSupplierTool(name, args, cfg);
  if (name.startsWith("hiboutik_brand"))
    return handleBrandTool(name, args, cfg);
  if (name.startsWith("hiboutik_calendar"))
    return handleCalendarTool(name, args, cfg);
  if (name.startsWith("hiboutik_kitchen"))
    return handleKitchenTool(name, args, cfg);
  if (name.startsWith("hiboutik_till")) return handleTillTool(name, args, cfg);
  if (name.startsWith("hiboutik_time_tracking"))
    return handleTimeTrackingTool(name, args, cfg);
  if (name.startsWith("hiboutik_webhook"))
    return handleWebhookTool(name, args, cfg);
  if (name.startsWith("hiboutik_user")) return handleUserTool(name, args, cfg);
  if (name.startsWith("hiboutik_size")) return handleSizeTool(name, args, cfg);
  if (name.startsWith("hiboutik_store"))
    return handleStoreTool(name, args, cfg);
  if (name.startsWith("hiboutik_action_link"))
    return handleActionLinkTool(name, args, cfg);
  if (name.startsWith("hiboutik_payment"))
    return handlePaymentTool(name, args, cfg);
  if (name.startsWith("hiboutik_modifier"))
    return handleModifierTool(name, args, cfg);
  if (name.startsWith("hiboutik_credit_note"))
    return handleCreditNoteTool(name, args, cfg);
  if (name.startsWith("hiboutik_search"))
    return handleSearchTool(name, args, cfg);
  if (name.startsWith("hiboutik_")) return handleOtherTool(name, args, cfg);

  throw new Error(`Unknown tool: ${name}`);
}

startMcpServer({
  name: "mcp-hiboutik",
  version: "1.0.0",
  tools: allTools,
  handler: handler as ToolHandler<HiboutikConfig>,
  config,
}).catch(console.error);
