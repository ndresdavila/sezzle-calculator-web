import { useLayoutEffect, useRef, useState } from "react";
import { rangeLabel } from "../displayRange";

interface DisplayProps {
  value: string;
  expression: string;
  error: boolean;
}

const maxFont = 42;
const minFont = 13;

export function Display({ value, expression, error }: DisplayProps) {
  const valueRef = useRef<HTMLOutputElement>(null);
  const [shown, setShown] = useState(value);
  const [fontSize, setFontSize] = useState(maxFont);
  const [forcedError, setForcedError] = useState(false);

  useLayoutEffect(() => {
    const element = valueRef.current;
    if (!element) {
      return;
    }

    const fit = () => {
      if (error || element.clientWidth === 0) {
        setShown(value);
        setFontSize(error ? 28 : maxFont);
        setForcedError(false);
        return;
      }

      element.textContent = value;
      let size = maxFont;
      element.style.fontSize = `${size}px`;
      while (size > minFont && element.scrollWidth > element.clientWidth) {
        size -= 1;
        element.style.fontSize = `${size}px`;
      }

      if (element.scrollWidth > element.clientWidth) {
        setShown(rangeLabel(value));
        setFontSize(28);
        setForcedError(true);
        return;
      }

      setShown(value);
      setFontSize(size);
      setForcedError(false);
    };

    fit();
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, [error, value]);

  const showError = error || forcedError;

  return (
    <div className="display">
      <output
        ref={valueRef}
        className="display__value"
        style={{ fontSize: `${fontSize}px` }}
        data-error={showError || undefined}
      >
        {shown}
      </output>
      <p className="display__expression" data-error={error || undefined}>
        {expression}
      </p>
    </div>
  );
}
