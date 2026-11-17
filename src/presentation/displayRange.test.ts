import { describe, expect, it } from "vitest";
import { rangeLabel } from "./displayRange";

describe("rangeLabel", () => {
  it("calls a huge value overflow for both signs", () => {
    expect(rangeLabel("1e40")).toBe("Overflow");
    expect(rangeLabel("-1e40")).toBe("Overflow");
    expect(rangeLabel("9".repeat(40))).toBe("Overflow");
    expect(rangeLabel(`-${"9".repeat(40)}`)).toBe("Overflow");
  });

  it("calls a tiny value underflow for both signs", () => {
    expect(rangeLabel("1e-20")).toBe("Underflow");
    expect(rangeLabel("-1e-20")).toBe("Underflow");
    expect(rangeLabel("0.0000001")).toBe("Underflow");
    expect(rangeLabel("-0.0000001")).toBe("Underflow");
  });
});
