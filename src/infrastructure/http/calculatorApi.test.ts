import { afterEach, describe, expect, it, vi } from "vitest";
import { CalculatorError } from "../../application/ports/calculatorClient";
import { createCalculatorClient } from "./calculatorApi";

const fetchMock = vi.fn<typeof fetch>();

describe("calculator API client", () => {
  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("returns the result string from the evaluate endpoint", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue(jsonResponse({ expression: "1+1", result: "2" }, 200));

    await expect(createCalculatorClient("http://api").evaluate("1+1")).resolves.toBe("2");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api/api/v1/evaluate",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ expression: "1+1" }) }),
    );
  });

  it("surfaces the API error message and code", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockResolvedValue(
      jsonResponse({ error: { code: "DIVISION_BY_ZERO", message: "Cannot divide by zero" } }, 422),
    );

    await expect(createCalculatorClient().evaluate("1/0")).rejects.toMatchObject({
      name: "CalculatorError",
      message: "Cannot divide by zero",
      code: "DIVISION_BY_ZERO",
    } satisfies Partial<CalculatorError>);
  });

  it("reports a network failure without a response", async () => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockRejectedValue(new Error("offline"));
    await expect(createCalculatorClient().evaluate("1+1")).rejects.toMatchObject({ code: "NETWORK" });
  });
});

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
