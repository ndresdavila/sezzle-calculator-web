import { CalculatorError, type CalculatorClient } from "../../application/ports/calculatorClient";

interface ErrorPayload {
  result?: string;
  error?: { code?: string; message?: string };
}

export function createCalculatorClient(baseUrl = import.meta.env.VITE_API_BASE_URL ?? ""): CalculatorClient {
  return {
    evaluate(expression: string) {
      return post(baseUrl, "/api/v1/evaluate", { expression });
    },
  };
}

async function post(baseUrl: string, path: string, body: unknown): Promise<string> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new CalculatorError("Cannot reach the calculator service", "NETWORK");
  }

  const payload = (await response.json().catch(() => null)) as ErrorPayload | null;
  if (!response.ok) {
    throw new CalculatorError(
      payload?.error?.message ?? "The calculator could not complete that request",
      payload?.error?.code ?? "REQUEST_FAILED",
    );
  }
  if (!payload?.result) {
    throw new CalculatorError("The calculator returned an empty result", "INVALID_RESPONSE");
  }
  return payload.result;
}
