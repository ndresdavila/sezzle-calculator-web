import { useEffect } from "react";
import type { CalculatorClient } from "../../application/ports/calculatorClient";
import type { Operator } from "../../domain/calculator";
import { useCalculator } from "../hooks/useCalculator";
import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { StatusBar } from "./StatusBar";

export function Calculator({ client }: { client: CalculatorClient }) {
  const calculator = useCalculator(client);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (/^[0-9]$/.test(event.key)) {
        calculator.digit(event.key);
        return;
      }
      const operators: Record<string, Operator> = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        "^": "^",
      };
      if (event.key in operators) {
        event.preventDefault();
        calculator.operator(operators[event.key]);
        return;
      }
      if (event.key === ".") {
        calculator.decimal();
        return;
      }
      if (event.key === "%") {
        calculator.percent();
        return;
      }
      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        void calculator.equals();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        calculator.backspace();
        return;
      }
      if (event.key === "Escape" || event.key === "c" || event.key === "C") {
        calculator.clear();
        return;
      }
      if (event.key === "s" || event.key === "S") {
        void calculator.squareRoot();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [calculator]);

  return (
    <div className="app-shell">
      <h1 className="sr-only">Calculator</h1>
      <section className="device" aria-label="Calculator" aria-busy={calculator.pending}>
        <StatusBar />
        <div className="screen">
          <Display value={calculator.value} expression={calculator.expression} error={calculator.error} />
          <div className="functions">
            <button
              type="button"
              className="key key--accent key--function"
              aria-label="Square root"
              disabled={calculator.pending}
              onClick={() => void calculator.squareRoot()}
            >
              √
            </button>
            <button
              type="button"
              className="key key--accent key--function"
              aria-label="Power"
              disabled={calculator.pending}
              onClick={() => calculator.operator("^")}
            >
              xʸ
            </button>
          </div>
        </div>
        <Keypad
          disabled={calculator.pending}
          onDigit={calculator.digit}
          onDecimal={calculator.decimal}
          onOperator={calculator.operator}
          onClear={calculator.clear}
          onNegate={calculator.negate}
          onPercent={calculator.percent}
          onBackspace={calculator.backspace}
          onEquals={() => void calculator.equals()}
        />
      </section>
    </div>
  );
}
