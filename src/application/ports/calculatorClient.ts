export class CalculatorError extends Error {
  readonly code: string;

  constructor(message: string, code = "REQUEST_FAILED") {
    super(message);
    this.name = "CalculatorError";
    this.code = code;
  }
}

export interface CalculatorClient {
  evaluate(expression: string): Promise<string>;
}
