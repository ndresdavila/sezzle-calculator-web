# Prompt: calculator UI

## Role

You are a senior frontend engineer. Build a React + TypeScript calculator that a reviewer can run, test, and restyle from one file. Match the spirit of a soft neumorphic phone calculator. Do not chase a pixel-perfect copy.

## Objective

Ship the web client for an existing Go calculator API. The screen collects an expression and the API evaluates it. The interface must work in portrait and landscape on a phone and on a tablet, in a defined light theme and a defined dark theme.

## Goal

Pressing `3 4 6 + 7 4 × 2 4 =` renders `2122` returned by `POST /api/v1/evaluate`. Changing `displayPrimary` in the theme map changes the result color in both the stylesheet and the tests, with no other edit.

## Context

- Sibling API: `sezzle-calculator-api`, default `http://localhost:8080`.
- Reference: an upright calculator, large result, smaller expression under it, four-column keypad, light blue figures on white keys, and a slate dark mode with light figures.
- The API evaluates expressions. `346+74*24` is `2122`. `200+10%` is `220`. `sqrt(9)` is `3`.
- Results are decimal strings.

## Requirements

### Functional

- Keys: clear, sign, percent, divide, digits, multiply, subtract, add, decimal, backspace, equals.
- Optional keys, visually secondary: square root and power.
- Show the running expression and the result. Show API error messages. Clear recovers.
- Keyboard support for the same actions.
- Light and dark toggle, persisted in `localStorage`, defaulting to the system preference.
- Call the API for arithmetic. Do not implement addition in the client.

### Non-functional

- Hexagonal client: pure domain state machine, `CalculatorClient` port, `fetch` adapter, React presentation.
- Every color and colored shadow is a constant on `ThemeTokens`. CSS uses variables generated from that object.
- A test fails if presentation code hardcodes a color.
- Responsive layout for phone portrait, phone landscape, tablet portrait, tablet landscape, and a desktop card.
- Unit tests for the state machine, the HTTP client, the theme, and the main interaction.
- Vite, TypeScript strict, React.
- Dockerfile that serves the build behind nginx and proxies `/api`.
- Compose file that runs this UI with the API.
- Human-readable docs for setup, architecture, testing, theming, layout, and decisions.

## Constraints

- Do not add a calculation history, accounts, or a second visual theme.
- Do not resolve percent on the client. Append `%` and let the API apply its rule.
- Do not put hex colors in CSS.
- Keep the main keypad at four columns so the reference stays recognizable.
- `VITE_API_BASE_URL` defaults to empty so dev and Docker can proxy.

## Architecture

```text
src/domain/calculator.ts              reduce, expressionToEvaluate, displays
src/application/ports                 CalculatorClient, CalculatorError
src/infrastructure/http               fetch implementation
src/presentation/theme/tokens.ts      the only color file
src/presentation/components           keypad, display, status bar
src/presentation/hooks/useCalculator  calls the port
```

The component receives the client as a prop so tests can substitute it.

## Testing

- Domain: the reference expression, operator replacement, percent, sign, backspace, clear, and square-root operand selection.
- HTTP: a 200 result, a 422 body, and a thrown network error.
- Theme: identical token keys, variables applied on the document, every variable used in CSS, no color literals outside `tokens.ts`.
- UI: click through to `2122`, division by zero, keyboard `2+2`, theme toggle.
- Document `npm test` and `npm run test:coverage`.

## Acceptance criteria

- `npm test` and `npm run build` pass.
- With the API running, the reference expression shows 2122.
- Light and dark are visibly different and both come from `tokens.ts`.
- Phone landscape shows the keypad beside the display.
- `docker compose up --build` from this repo, with the API available, serves the UI on port 3000.

## Deliverables

- Public repository `ndresdavila/sezzle-calculator-web`.
- README with setup, tests, Docker, and design notes.
- `docs/` and this prompt.
- GitHub Actions workflow that runs the tests and the build.

## Out of scope

- Reimplementing decimal arithmetic in TypeScript.
- Animation beyond a pressed key.
- Internationalization of the keypad.
