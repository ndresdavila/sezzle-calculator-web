# Testing

## Run

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

The text report prints in the terminal. HTML is written to `coverage/index.html`, which is gitignored.

`make test` and `make cover` call those scripts.

## Latest local report

| | Statements | Branches | Functions | Lines |
| --- | --- | --- | --- | --- |
| Whole `src` tree | 87.7% | 72.6% | 90.2% | 87.7% |

The domain module and the HTTP adapter are the numbers that matter for behavior. Presentation files are mostly covered through the screen test; a few key handlers are only exercised by the domain tests. Regenerate the table with `npm run test:coverage` after a change.

## What is covered

| Area | Test |
| --- | --- |
| Expression editing | `src/domain/calculator.test.ts` builds `346+74*24`, percent, sign, backspace, clear, and the Overflow and Underflow labels |
| Display range | `src/presentation/displayRange.test.ts` labels a huge or tiny result, for both signs |
| HTTP adapter | success, API error code, and a network failure |
| Theme | both modes expose the same tokens, every token is a CSS variable, and no component hardcodes a color |
| Screen | clicking the reference expression shows `2122`, division by zero shows the API message, keyboard `2+2` works, and the theme toggle switches the document |

The component tests use a fake `CalculatorClient`. They do not start the API. That keeps them unit tests. The contract with the real service is covered by the API repository and by trying the expression in the browser.

## Typecheck

```bash
npm run build
```

The build fails if `tsc --noEmit` fails, then Vite emits `dist/`.
