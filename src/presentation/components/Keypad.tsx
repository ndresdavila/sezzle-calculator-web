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
}

export function Keypad(props: KeypadProps) {
  return (
    <div className="keypad" aria-label="Keypad">
      <Key name="Clear" accent disabled={props.disabled} onPress={props.onClear}>
        C
      </Key>
      <Key name="Negate" accent disabled={props.disabled} onPress={props.onNegate}>
        +/−
      </Key>
      <Key name="Percent" accent disabled={props.disabled} onPress={props.onPercent}>
        %
      </Key>
      <Key name="Divide" accent disabled={props.disabled} onPress={() => props.onOperator("/")}>
        /
      </Key>

      <Key name="7" disabled={props.disabled} onPress={() => props.onDigit("7")}>
        7
      </Key>
      <Key name="8" disabled={props.disabled} onPress={() => props.onDigit("8")}>
        8
      </Key>
      <Key name="9" disabled={props.disabled} onPress={() => props.onDigit("9")}>
        9
      </Key>
      <Key name="Multiply" accent disabled={props.disabled} onPress={() => props.onOperator("*")}>
        ×
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
      <Key name="Subtract" accent disabled={props.disabled} onPress={() => props.onOperator("-")}>
        −
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
      <Key name="Add" accent disabled={props.disabled} onPress={() => props.onOperator("+")}>
        +
      </Key>

      <Key name="0" disabled={props.disabled} onPress={() => props.onDigit("0")}>
        0
      </Key>
      <Key name="Decimal" disabled={props.disabled} onPress={props.onDecimal}>
        <span className="key__dot" aria-hidden="true" />
      </Key>
      <Key name="Backspace" accent disabled={props.disabled} onPress={props.onBackspace}>
        <BackspaceIcon />
      </Key>
      <Key name="Equals" accent disabled={props.disabled} onPress={props.onEquals}>
        =
      </Key>
    </div>
  );
}

function Key({
  name,
  accent = false,
  disabled,
  onPress,
  children,
}: {
  name: string;
  accent?: boolean;
  disabled: boolean;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={accent ? "key key--accent" : "key"}
      aria-label={name}
      disabled={disabled}
      onClick={onPress}
    >
      {children}
    </button>
  );
}

function BackspaceIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-5-7 5-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
