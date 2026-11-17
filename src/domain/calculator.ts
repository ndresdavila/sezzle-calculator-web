export type Operator = "+" | "-" | "*" | "/" | "^";

export interface NumberToken {
  type: "number";
  value: string;
}

export interface OperatorToken {
  type: "operator";
  value: Operator;
}

export type Token = NumberToken | OperatorToken;

export interface CalculatorState {
  tokens: Token[];
  current: string;
  justEvaluated: boolean;
  result: string | null;
  expression: string | null;
  error: string | null;
  errorCode: string | null;
}

export type CalculatorAction =
  | { type: "digit"; value: string }
  | { type: "decimal" }
  | { type: "operator"; value: Operator }
  | { type: "percent" }
  | { type: "negate" }
  | { type: "clear" }
  | { type: "backspace" }
  | { type: "result"; value: string; expression: string }
  | { type: "error"; message: string; code?: string; expression: string }
  | { type: "replace"; value: string; expression: string };

const completeNumber = /^-?\d+(\.\d+)?%*$/;
const maxDigits = 15;

export function initialState(): CalculatorState {
  return {
    tokens: [],
    current: "",
    justEvaluated: false,
    result: null,
    expression: null,
    error: null,
    errorCode: null,
  };
}

export function reduce(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "digit":
      return typeDigit(state, action.value);
    case "decimal":
      return typeDecimal(state);
    case "operator":
      return pushOperator(state, action.value);
    case "percent":
      return applyPercent(state);
    case "negate":
      return applyNegate(state);
    case "clear":
      return initialState();
    case "backspace":
      return applyBackspace(state);
    case "result":
      return {
        tokens: [],
        current: "",
        justEvaluated: true,
        result: action.value,
        expression: action.expression,
        error: null,
        errorCode: null,
      };
    case "error":
      return {
        ...state,
        justEvaluated: false,
        error: action.message,
        errorCode: action.code ?? null,
        expression: action.expression,
      };
    case "replace":
      return replaceOperand(state, action.value, action.expression);
    default:
      return state;
  }
}

/** Expression sent to the API. Trailing operators are dropped; incomplete input returns null. */
export function expressionToEvaluate(state: CalculatorState): string | null {
  if (state.error) {
    return null;
  }
  const operand = canonicalOperand(state.current);
  if (operand === null) {
    return null;
  }
  const tokens = state.tokens.slice();
  if (operand === "" && tokens.at(-1)?.type === "operator") {
    tokens.pop();
  }
  if (tokens.length === 0 && operand === "") {
    return null;
  }
  return join(tokens) + operand;
}

/** Operand used by immediate unary actions such as square root. */
export function unaryOperand(state: CalculatorState): string | null {
  if (state.error) {
    return null;
  }
  const operand = canonicalOperand(state.current);
  if (operand) {
    return operand;
  }
  if (state.justEvaluated && state.result) {
    return state.result;
  }
  return null;
}

export function mainDisplay(state: CalculatorState): string {
  if (state.error) {
    if (state.errorCode === "OVERFLOW") {
      return "Overflow";
    }
    if (state.errorCode === "UNDERFLOW") {
      return "Underflow";
    }
    return "Error";
  }
  if (state.current === "-") {
    return "-0";
  }
  if (state.current !== "") {
    return state.current;
  }
  if (state.justEvaluated && state.result !== null) {
    return state.result;
  }
  for (let index = state.tokens.length - 1; index >= 0; index -= 1) {
    const token = state.tokens[index];
    if (token.type === "number") {
      return token.value;
    }
  }
  return "0";
}

export function expressionLine(state: CalculatorState): string {
  if (state.error) {
    return state.error ?? "";
  }
  const raw =
    state.justEvaluated && state.expression ? state.expression : join(state.tokens) + state.current;
  return prettifyExpression(raw);
}

export function prettifyExpression(expression: string): string {
  return expression.replaceAll("*", "×").replaceAll("/", "÷");
}

function typeDigit(state: CalculatorState, digit: string): CalculatorState {
  if (!/^[0-9]$/.test(digit)) {
    return state;
  }
  if (state.error || state.justEvaluated) {
    return { ...initialState(), current: digit };
  }
  return { ...state, current: appendDigit(state.current, digit) };
}

function typeDecimal(state: CalculatorState): CalculatorState {
  if (state.error || state.justEvaluated) {
    return { ...initialState(), current: "0." };
  }
  if (state.current.endsWith("%") || state.current.includes(".")) {
    return state;
  }
  if (state.current === "" || state.current === "-") {
    return { ...state, current: `${state.current}0.` };
  }
  return { ...state, current: `${state.current}.` };
}

function pushOperator(state: CalculatorState, operator: Operator): CalculatorState {
  if (state.error) {
    return state;
  }
  if (state.justEvaluated && state.result) {
    return {
      tokens: [
        { type: "number", value: state.result },
        { type: "operator", value: operator },
      ],
      current: "",
      justEvaluated: false,
      result: null,
      expression: null,
      error: null,
      errorCode: null,
    };
  }
  const operand = canonicalOperand(state.current);
  if (operand === null) {
    return state;
  }
  if (operand === "") {
    const tokens = state.tokens.slice();
    const last = tokens.at(-1);
    if (!last || last.type !== "operator") {
      return state;
    }
    tokens[tokens.length - 1] = { type: "operator", value: operator };
    return { ...state, tokens };
  }
  return {
    ...state,
    tokens: [
      ...state.tokens,
      { type: "number", value: operand },
      { type: "operator", value: operator },
    ],
    current: "",
    justEvaluated: false,
    result: null,
    expression: null,
    error: null,
  };
}

function applyPercent(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }
  const base = state.justEvaluated && state.result ? state.result : state.current;
  const operand = canonicalOperand(base);
  if (!operand) {
    return state;
  }
  return {
    ...state,
    tokens: state.justEvaluated ? [] : state.tokens,
    current: `${operand}%`,
    justEvaluated: false,
    result: null,
    expression: null,
    error: null,
  };
}

function applyNegate(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }
  if (state.justEvaluated && state.result) {
    return { ...state, result: toggleSign(state.result) };
  }
  if (state.current === "") {
    return { ...state, current: "-" };
  }
  if (state.current === "-") {
    return { ...state, current: "" };
  }
  return { ...state, current: toggleSign(state.current) };
}

function applyBackspace(state: CalculatorState): CalculatorState {
  if (state.error || state.justEvaluated) {
    return initialState();
  }
  if (state.current !== "") {
    return { ...state, current: state.current.slice(0, -1) };
  }
  if (state.tokens.length === 0) {
    return state;
  }
  const tokens = state.tokens.slice();
  tokens.pop();
  const previous = tokens.at(-1);
  if (previous?.type === "number") {
    tokens.pop();
    return { ...state, tokens, current: previous.value };
  }
  return { ...state, tokens };
}

function replaceOperand(state: CalculatorState, value: string, expression: string): CalculatorState {
  if (state.tokens.length === 0) {
    return {
      tokens: [],
      current: "",
      justEvaluated: true,
      result: value,
      expression,
      error: null,
      errorCode: null,
    };
  }
  return {
    ...state,
    current: value,
    justEvaluated: false,
    result: null,
    expression: null,
    error: null,
  };
}

function appendDigit(current: string, digit: string): string {
  if (current.endsWith("%") || digitCount(current) >= maxDigits) {
    return current;
  }
  if (!current.includes(".")) {
    if (current === "0") {
      return digit;
    }
    if (current === "-0") {
      return digit === "0" ? "-0" : `-${digit}`;
    }
  }
  return current + digit;
}

function canonicalOperand(current: string): string | null {
  if (current === "") {
    return "";
  }
  const stripped = current.endsWith(".") ? current.slice(0, -1) : current;
  return completeNumber.test(stripped) ? stripped : null;
}

function toggleSign(value: string): string {
  return value.startsWith("-") ? value.slice(1) : `-${value}`;
}

function digitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

function join(tokens: Token[]): string {
  return tokens.map((token) => token.value).join("");
}
