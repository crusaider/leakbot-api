import fetch from "cross-fetch";
import { ApiResponse } from "./ApiResponse";
import { LeakbotApiError } from "./LeakbotApiError";

const API_BASE_URL = "https://app.leakbot.io";

interface ErrorResponse extends ApiResponse {
  readonly error: number;
  readonly description: string;
}

function isErrorResponse(o: unknown): o is ErrorResponse {
  return (
    typeof o === "object" && o !== null && "error" in o && "description" in o
  );
}

export async function sendAPIReqest<RT>({
  path,
  body,
  token,
}: {
  path: string;
  body?: Record<string, unknown>;
  token?: string;
}): Promise<RT> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Cookie"] = `lctoken=${token}`;
  }

  const url = new URL(API_BASE_URL);
  url.pathname = path;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result = (await response.json()) as RT | ErrorResponse;

  if (isErrorResponse(result)) {
    throw new LeakbotApiError(result.error, result.description);
  }

  return result;
}
