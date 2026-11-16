import type { CalculatorClient } from "../application/ports/calculatorClient";
import { createCalculatorClient } from "../infrastructure/http/calculatorApi";
import { Calculator } from "./components/Calculator";
import { ThemeProvider } from "./theme/ThemeProvider";

const defaultClient = createCalculatorClient();

export function App({ client = defaultClient }: { client?: CalculatorClient }) {
  return (
    <ThemeProvider>
      <Calculator client={client} />
    </ThemeProvider>
  );
}
