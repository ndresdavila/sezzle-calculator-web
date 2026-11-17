import { describe, expect, it } from "vitest";
import {
  type CalculatorState,
  type Operator,
  expressionLine,
  expressionToEvaluate,
  initialState,
  mainDisplay,
  prettifyExpression,
  reduce,
  unaryOperand,
} from "./calculator";

function press(keys: string, start: CalculatorState = initialState()): CalculatorState {
  return [...keys].reduce((state, key) => {
    if (/^[0-9]$/.test(key)) {
      return reduce(state, { type: "digit", value: key });
    }
    if (key === ".") {
      return reduce(state, { type: "decimal" });
    }
    if ("+-*/^".includes(key)) {
      return reduce(state, { type: "operator", value: key as Operator });
    }
    if (key === "%") {
      return reduce(state, { type: "percent" });
    }
    if (key === "n") {
      return reduce(state, { type: "negate" });
    }
    if (key === "<") {
      return reduce(state, { type: "backspace" });
    }
    if (key === "c") {
      return reduce(state, { type: "clear" });
    }
    throw new Error(`Unknown key ${key}`);
  }, start);
}

describe("calculator input", () => {
  it("builds the reference expression", () => {
    const state = press("346+74*24");
    expect(expressionToEvaluate(state)).toBe("346+74*24");
    expect(mainDisplay(state)).toBe("24");
    expect(expressionLine(state)).toBe("346+74×24");
  });

  it("shows a result and can continue from it", () => {
    const evaluated = reduce(press("1+1"), {
      type: "result",
      value: "2",
      expression: "1+1",
    });
    expect(mainDisplay(evaluated)).toBe("2");
    expect(expressionLine(evaluated)).toBe("1+1");

    const continued = reduce(evaluated, { type: "operator", value: "*" });
    expect(expressionToEvaluate(press("4", continued))).toBe("2*4");
  });

  it("replaces a trailing operator and ignores a leading one", () => {
    expect(expressionLine(press("346+-"))).toBe("346-");
    expect(expressionToEvaluate(press("+"))).toBeNull();
  });

  it("keeps a single decimal point and strips it when committing", () => {
    expect(mainDisplay(press("10.5.2"))).toBe("10.52");
    expect(expressionToEvaluate(press("12.+3"))).toBe("12+3");
  });

  it("does not grow a leading zero and caps the length", () => {
    expect(mainDisplay(press("0007"))).toBe("7");
    expect(mainDisplay(press("1".repeat(20)))).toHaveLength(15);
  });

  it("encodes percent and sign as expression text", () => {
    expect(expressionToEvaluate(press("200+10%"))).toBe("200+10%");
    expect(expressionToEvaluate(press("12n"))).toBe("-12");
    expect(mainDisplay(press("n"))).toBe("-0");
    expect(expressionToEvaluate(press("nn"))).toBeNull();
  });

  it("edits the current number and restores it after an operator", () => {
    expect(mainDisplay(press("12<"))).toBe("1");
    const edited = press("346+74*<");
    expect(mainDisplay(edited)).toBe("74");
    expect(expressionToEvaluate(edited)).toBe("346+74");
  });

  it("clears after an error, a result, or the clear key", () => {
    const failed = reduce(press("1/0"), {
      type: "error",
      message: "Cannot divide by zero",
      expression: "1/0",
    });
    expect(mainDisplay(failed)).toBe("Error");
    expect(expressionLine(failed)).toBe("Cannot divide by zero");
    const overflow = reduce(initialState(), {
      type: "error",
      message: "The result is too large to represent",
      code: "OVERFLOW",
      expression: "2^999",
    });
    const underflow = reduce(initialState(), {
      type: "error",
      message: "The result is too small to represent",
      code: "UNDERFLOW",
      expression: "2^-999",
    });
    expect(mainDisplay(overflow)).toBe("Overflow");
    expect(mainDisplay(underflow)).toBe("Underflow");
    expect(mainDisplay(reduce(failed, { type: "backspace" }))).toBe("0");
    expect(mainDisplay(press("c", press("99")))).toBe("0");
  });

  it("exposes the current operand for square root", () => {
    expect(unaryOperand(press("81"))).toBe("81");
    expect(unaryOperand(press("9+"))).toBeNull();
    const replaced = reduce(press("9"), {
      type: "replace",
      value: "3",
      expression: "sqrt(9)",
    });
    expect(mainDisplay(replaced)).toBe("3");
    expect(expressionLine(replaced)).toBe("sqrt(9)");
    expect(expressionToEvaluate(press("+4", replaced))).toBe("3+4");
  });

  it("replaces a finished result with a square root", () => {
    const evaluated = reduce(press("9"), { type: "result", value: "9", expression: "9" });
    const rooted = reduce(evaluated, { type: "replace", value: "3", expression: "sqrt(9)" });
    expect(mainDisplay(rooted)).toBe("3");
    expect(expressionLine(rooted)).toBe("sqrt(9)");
    expect(expressionToEvaluate(reduce(rooted, { type: "operator", value: "+" }))).toBe("3");
  });

  it("turns a signed zero into a negative digit", () => {
    expect(mainDisplay(press("0n5"))).toBe("-5");
    expect(mainDisplay(press("10%5"))).toBe("10%");
  });

  it("prettifies operators only for display", () => {
    expect(prettifyExpression("8/2*3")).toBe("8÷2×3");
  });
});
