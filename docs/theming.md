# Theming

Light and dark are two complete palettes. They are not a single palette with a few overrides. The light device uses blue for the result and the operator keys. The dark device uses near-white figures on slate keys, which matches the reference.

## Change a color

Edit one value in `src/presentation/theme/tokens.ts`.

```ts
displayPrimary: "#2F80ED",
```

`applyTheme` copies every token onto `document.documentElement` as a CSS variable. `displayPrimary` becomes `--display-primary`. Global CSS is only allowed to read those variables. A unit test fails if a presentation file introduces a hex color, `rgb()`, or `hsl()`, and it fails if a token is missing from the stylesheet.

Shadows live in the same map because a shadow is a color. Changing `keyShadow` updates the resting key and the pressed key together. `deviceShadow` is the short lower edge of the card. Keep that edge close to `deviceBackground` so it reads as the same material.

Hover does not add a color. Light mode darkens the key with `brightness(0.82)`. Dark mode lightens it with `brightness(1.35)`. The key also lifts two pixels, then sinks when pressed.

## What is not a theme token

Radius, type scale, and layout stay in `global.css`. They do not change between light and dark. The font is Manrope, loaded from the package so the Docker build does not call a font CDN.

## Persistence

The toggle writes `calculator-theme` to `localStorage`. On a first visit, the choice follows `prefers-color-scheme`. `main.tsx` applies the theme before React renders so the first paint is not the wrong palette.
