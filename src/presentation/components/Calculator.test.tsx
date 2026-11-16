import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CalculatorError, type CalculatorClient } from "../../application/ports/calculatorClient";
import { App } from "../App";

function client(evaluate: CalculatorClient["evaluate"]): CalculatorClient {
  return { evaluate };
}

describe("calculator UI", () => {
  it("evaluates 346 + 74 × 24 through the API", async () => {
    const user = userEvent.setup();
    const evaluate = vi.fn(async (expression: string) => {
      expect(expression).toBe("346+74*24");
      return "2122";
    });
    render(<App client={client(evaluate)} />);

    for (const name of ["3", "4", "6", "Add", "7", "4", "Multiply", "2", "4", "Equals"]) {
      await user.click(screen.getByRole("button", { name }));
    }

    expect(await screen.findByRole("status")).toHaveTextContent("2122");
    expect(screen.getByText("346+74×24")).toBeInTheDocument();
    expect(evaluate).toHaveBeenCalledTimes(1);
  });

  it("shows a division by zero error and lets clear recover", async () => {
    const user = userEvent.setup();
    const evaluate = vi.fn(async () => {
      throw new CalculatorError("Cannot divide by zero", "DIVISION_BY_ZERO");
    });
    render(<App client={client(evaluate)} />);

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "Divide" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "Equals" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Error");
    expect(screen.getByText("Cannot divide by zero")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByRole("status")).toHaveTextContent("0");
    expect(screen.queryByText("Cannot divide by zero")).not.toBeInTheDocument();
  });

  it("accepts keyboard input and switches theme from the token map", async () => {
    const user = userEvent.setup();
    const evaluate = vi.fn(async () => "4");
    render(<App client={client(evaluate)} />);

    await user.keyboard("2+2{Enter}");
    expect(await screen.findByRole("status")).toHaveTextContent("4");
    expect(evaluate).toHaveBeenCalledWith("2+2");

    await user.click(screen.getByRole("button", { name: "Switch to dark mode" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.style.getPropertyValue("--device-background")).not.toBe("");

    await user.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
