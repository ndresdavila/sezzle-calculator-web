import { useCallback, useMemo, useRef, useState } from "react";
import type { CalculatorClient } from "../../application/ports/calculatorClient";
import { CalculatorError } from "../../application/ports/calculatorClient";
import {
  type CalculatorState,
  type Operator,
  expressionLine,
  expressionToEvaluate,
  initialState,
  mainDisplay,
  reduce,
  unaryOperand,
} from "../../domain/calculator";

export function useCalculator(client: CalculatorClient) {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [pending, setPending] = useState(false);
  const stateRef = useRef(state);
  const pendingRef = useRef(false);
  stateRef.current = state;

  const dispatch = useCallback((action: Parameters<typeof reduce>[1]) => {
    const next = reduce(stateRef.current, action);
    stateRef.current = next;
    setState(next);
  }, []);

  const digit = useCallback((value: string) => dispatch({ type: "digit", value }), [dispatch]);
  const decimal = useCallback(() => dispatch({ type: "decimal" }), [dispatch]);
  const operator = useCallback(
    (value: Operator) => dispatch({ type: "operator", value }),
    [dispatch],
  );
  const percent = useCallback(() => dispatch({ type: "percent" }), [dispatch]);
  const negate = useCallback(() => dispatch({ type: "negate" }), [dispatch]);
  const clear = useCallback(() => dispatch({ type: "clear" }), [dispatch]);
  const backspace = useCallback(() => dispatch({ type: "backspace" }), [dispatch]);

  const guard = useCallback(async (work: () => Promise<void>) => {
    if (pendingRef.current) {
      return;
    }
    pendingRef.current = true;
    setPending(true);
    try {
      await work();
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  }, []);

  const equals = useCallback(() => {
    const expression = expressionToEvaluate(stateRef.current);
    if (!expression) {
      return Promise.resolve();
    }
    return guard(async () => {
      try {
        const value = await client.evaluate(expression);
        dispatch({ type: "result", value, expression });
      } catch (error) {
        dispatch({ type: "error", message: messageFrom(error), expression });
      }
    });
  }, [client, dispatch, guard]);

  const squareRoot = useCallback(() => {
    const operand = unaryOperand(stateRef.current);
    if (!operand) {
      return Promise.resolve();
    }
    const expression = `sqrt(${operand})`;
    return guard(async () => {
      try {
        const value = await client.evaluate(expression);
        dispatch({ type: "replace", value, expression });
      } catch (error) {
        dispatch({ type: "error", message: messageFrom(error), expression });
      }
    });
  }, [client, dispatch, guard]);

  return useMemo(
    () => ({
      digit,
      decimal,
      operator,
      percent,
      negate,
      clear,
      backspace,
      equals,
      squareRoot,
      pending,
      error: state.error !== null,
      value: mainDisplay(state),
      expression: expressionLine(state),
    }),
    [
      backspace,
      clear,
      decimal,
      digit,
      equals,
      negate,
      operator,
      pending,
      percent,
      squareRoot,
      state,
    ],
  );
}

function messageFrom(error: unknown): string {
  if (error instanceof CalculatorError) {
    return error.message;
  }
  return "Cannot reach the calculator service";
}
