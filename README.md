# Sezzle calculator

React client for the [calculator API](https://github.com/ndresdavila/sezzle-calculator-api). The keypad builds an expression locally. Equals, square root, and every other arithmetic result come from the API.

Light mode uses blue figures on white keys. Dark mode uses a slate device with light figures. Both palettes are constants in `src/presentation/theme/tokens.ts`.

## Quick start

Start the API on port 8080, then:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to `http://localhost:8080`.

Try `346 + 74 × 24`. The display should show `2122`.

## Tests

```bash
make test
make cover
```

`make cover` prints the report and writes HTML under `coverage/`. See [docs/testing.md](docs/testing.md).

## Production build

```bash
npm run build
npm run preview
```

Set `VITE_API_BASE_URL` only when the API is on another origin. Leave it empty when nginx or Vite proxies `/api`.

## Docker, both services

With this repository and `sezzle-calculator-api` as sibling directories:

```bash
docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
```

Open `http://localhost:3000`. The published compose file can also build the API from GitHub:

```bash
docker compose up --build
```

## Layout

| Path | Role |
| --- | --- |
| `src/domain` | Input state machine. No React and no `fetch`. |
| `src/application/ports` | `CalculatorClient` |
| `src/infrastructure/http` | `fetch` adapter |
| `src/presentation` | Components, theme tokens, CSS variables |
| `docs/` | Architecture, setup, tests, theme, layout |
| `prompts/` | The prompt used to build the UI |

## Design in one page

- The state machine only edits the expression. It does not add or multiply.
- `200 + 10 %` is sent as `200+10%`. The API treats that as 220.
- Sign toggle and backspace edit the text. They are not requests.
- Colors, shadows, and focus rings exist only in `tokens.ts`. CSS uses `var(--...)`.
- The calculator is a fixed card: 292 by 560 upright, 428 by 408 horizontal. The page background stays visible around it. Turning the window morphs the card.
- In landscape the theme control sits to the left of the result. Extra functions sit to the left of the common keys. Keys stay the same size.
- A long result stays on one line and the type shrinks to fit. Past the numeric range the screen says Overflow or Underflow, for both signs.
- Hover darkens a key in light mode and lightens it in dark mode. The card has a short lower edge in the same color family as its face.

Keyboard: digits, `+ - * / ^ %`, Enter, Backspace, Escape, and `s` for square root.
