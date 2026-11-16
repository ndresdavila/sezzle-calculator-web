import { describe, expect, it } from "vitest";
import stylesheet from "./global.css?raw";
import { applyTheme, cssVariableName } from "./applyTheme";
import { themes, type ThemeTokens } from "./tokens";

const sources = import.meta.glob("../**/*.{css,ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const colorLiteral = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/;

describe("theme tokens", () => {
  it("keeps light and dark on the same set of tokens", () => {
    expect(Object.keys(themes.light).sort()).toEqual(Object.keys(themes.dark).sort());
    expect(themes.light.displayPrimary).not.toBe(themes.dark.displayPrimary);
    expect(themes.light.keyBackground).not.toBe(themes.dark.keyBackground);
  });

  it("publishes every token as a css variable", () => {
    applyTheme("dark");
    const root = document.documentElement;
    expect(root.dataset.theme).toBe("dark");
    for (const key of Object.keys(themes.dark) as Array<keyof ThemeTokens>) {
      const variable = cssVariableName(key);
      expect(root.style.getPropertyValue(variable)).toBe(themes.dark[key]);
      expect(stylesheet).toContain(`var(${variable})`);
    }
  });

  it("does not hardcode colors outside the token map", () => {
    const hits = Object.entries(sources)
      .filter(([file]) => !file.endsWith("/tokens.ts") && !file.includes(".test."))
      .filter(([, content]) => colorLiteral.test(content))
      .map(([file]) => file);
    expect(hits).toEqual([]);
  });
});
