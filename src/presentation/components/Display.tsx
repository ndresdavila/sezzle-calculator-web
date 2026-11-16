interface DisplayProps {
  value: string;
  expression: string;
  error: boolean;
}

export function Display({ value, expression, error }: DisplayProps) {
  const length = value.replace("-", "").length;
  const size = length > 16 ? "sm" : length > 10 ? "md" : "lg";

  return (
    <div className="display">
      <output className="display__value" data-size={size} data-error={error || undefined}>
        {value}
      </output>
      <p className="display__expression" data-error={error || undefined}>
        {expression}
      </p>
    </div>
  );
}
