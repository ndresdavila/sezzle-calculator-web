/**
 * Label for a result that cannot stay on one line.
 * A huge value, positive or negative, is overflow. A value too close to zero is underflow.
 */
export function rangeLabel(value: string): "Overflow" | "Underflow" {
  const body = value.trim().replace(/^-/, "");
  const scientific = body.match(/e([+-]?\d+)$/i);
  if (scientific) {
    return Number(scientific[1]) < 0 ? "Underflow" : "Overflow";
  }
  const [whole, fraction = ""] = body.split(".");
  const wholeDigits = whole.replace(/^0+/, "");
  if (wholeDigits.length > 0) {
    return "Overflow";
  }
  const leadingZeros = fraction.match(/^0*/)?.[0].length ?? 0;
  return leadingZeros >= 6 ? "Underflow" : "Overflow";
}
