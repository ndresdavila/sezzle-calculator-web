import type { ReactNode } from "react";
import type { Operator } from "../../domain/calculator";

interface KeypadProps {
  disabled: boolean;
  onDigit: (value: string) => void;
  onDecimal: () => void;
  onOperator: (value: Operator) => void;
  onClear: () => void;
  onNegate: () => void;
  onPercent: () => void;
  onBackspace: () => void;
  onEquals: () => void;
  onSquareRoot: () => void;
}

export function Keypad(props: KeypadProps) {
  return (
    <div className="board">
      <div className="functions" aria-label="Functions">
        <Key name="Square root" tone="function" disabled={props.disabled} onPress={props.onSquareRoot}>
          √
        </Key>
        <Key name="Power" tone="function" disabled={props.disabled} onPress={() => props.onOperator("^")}>
          xʸ
        </Key>
        <Key name="Negate" tone="function" disabled={props.disabled} onPress={props.onNegate}>
          +/−
        </Key>
        <Key name="Percent" tone="function" disabled={props.disabled} onPress={props.onPercent}>
          %
        </Key>
        <Key name="Clear" tone="function" wide disabled={props.disabled} onPress={props.onClear}>
          C
        </Key>
        <Key name="Backspace" tone="function" wide disabled={props.disabled} onPress={props.onBackspace}>
          <BackspaceIcon />
        </Key>
      </div>

      <div className="keypad" aria-label="Keypad">
        <Key name="7" disabled={props.disabled} onPress={() => props.onDigit("7")}>
          7
        </Key>
        <Key name="8" disabled={props.disabled} onPress={() => props.onDigit("8")}>
          8
        </Key>
        <Key name="9" disabled={props.disabled} onPress={() => props.onDigit("9")}>
          9
        </Key>
        <Key name="Divide" tone="operator" disabled={props.disabled} onPress={() => props.onOperator("/")}>
          <OperatorGlyph kind="divide" />
        </Key>

        <Key name="4" disabled={props.disabled} onPress={() => props.onDigit("4")}>
          4
        </Key>
        <Key name="5" disabled={props.disabled} onPress={() => props.onDigit("5")}>
          5
        </Key>
        <Key name="6" disabled={props.disabled} onPress={() => props.onDigit("6")}>
          6
        </Key>
        <Key name="Multiply" tone="operator" disabled={props.disabled} onPress={() => props.onOperator("*")}>
          <OperatorGlyph kind="multiply" />
        </Key>

        <Key name="1" disabled={props.disabled} onPress={() => props.onDigit("1")}>
          1
        </Key>
        <Key name="2" disabled={props.disabled} onPress={() => props.onDigit("2")}>
          2
        </Key>
        <Key name="3" disabled={props.disabled} onPress={() => props.onDigit("3")}>
          3
        </Key>
        <Key name="Subtract" tone="operator" disabled={props.disabled} onPress={() => props.onOperator("-")}>
          <OperatorGlyph kind="subtract" />
        </Key>

        <Key name="0" disabled={props.disabled} onPress={() => props.onDigit("0")}>
          0
        </Key>
        <Key name="Decimal" disabled={props.disabled} onPress={props.onDecimal}>
          <span className="key__dot" aria-hidden="true" />
        </Key>
        <Key name="Add" tone="operator" disabled={props.disabled} onPress={() => props.onOperator("+")}>
          <OperatorGlyph kind="add" />
        </Key>
        <Key name="Equals" tone="operator" disabled={props.disabled} onPress={props.onEquals}>
          <OperatorGlyph kind="equals" />
        </Key>
      </div>
    </div>
  );
}

function Key({
  name,
  tone = "number",
  wide = false,
  disabled,
  onPress,
  children,
}: {
  name: string;
  tone?: "number" | "function" | "operator";
  wide?: boolean;
  disabled: boolean;
  onPress: () => void;
  children: ReactNode;
}) {
  const toneClass = tone === "number" ? "" : ` key--${tone}`;
  const wideClass = wide ? " key--wide" : "";

  return (
    <button
      type="button"
      className={`key${toneClass}${wideClass}`}
      aria-label={name}
      disabled={disabled}
      onClick={onPress}
    >
      {children}
    </button>
  );
}

function OperatorGlyph({ kind }: { kind: "add" | "subtract" | "multiply" | "divide" | "equals" }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.7, strokeLinecap: "round" as const };

  return (
    <svg className="key__glyph" viewBox="0 0 24 24" aria-hidden="true">
      {kind === "add" && <path d="M12 4.25v15.5M4.25 12h15.5" {...stroke} />}
      {kind === "subtract" && <path d="M4.25 12h15.5" {...stroke} />}
      {kind === "multiply" && <path d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8" {...stroke} />}
      {kind === "equals" && <path d="M4.5 8.25h15M4.5 15.75h15" {...stroke} />}
      {kind === "divide" && (
        <>
          <path d="M5 12h14" {...stroke} />
          <circle cx="12" cy="6.15" r="1.55" fill="currentColor" />
          <circle cx="12" cy="17.85" r="1.55" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

function BackspaceIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 4.5h11.2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-5.2-7.5L8 4.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M10.4 9.2l5.2 5.6m0-5.6l-5.2 5.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
