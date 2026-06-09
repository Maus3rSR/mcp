import { HiboutikConfig } from "../index.js";

export async function hiboutikRequest(
  config: HiboutikConfig,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, unknown>
): Promise<unknown> {
  const url = `${config.baseUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Basic ${Buffer.from(`${config.account}:${config.user}:${config.apiKey}`).toString("base64")}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && (method === "POST" || method === "PUT" || method === "DELETE")) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hiboutik API error (${response.status}): ${errorText}`);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  
  // Return text for non-JSON responses
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Form-encoded request for some endpoints that require form data
export async function hiboutikFormRequest(
  config: HiboutikConfig,
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
  params?: Record<string, unknown>
): Promise<unknown> {
  const url = `${config.baseUrl}${endpoint}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "Authorization": `Basic ${Buffer.from(`${config.account}:${config.user}:${config.apiKey}`).toString("base64")}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (params) {
    const formParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        formParams.append(key, String(value));
      }
    }
    options.body = formParams.toString();
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hiboutik API error (${response.status}): ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
