# Design decisions

## The client does not calculate

The assignment asks the frontend to consume the API. The state machine records keys. It never adds two numbers. Equals posts the expression. Square root posts `sqrt(n)`. The number on the screen after those keys is the string the API returned.

Backspace, the decimal point, and the sign toggle only edit that text. Sending a request to delete a character would not make the architecture clearer.

## Percent stays in the expression

Pressing `%` appends `%` instead of asking the API for `n / 100` immediately. That preserves `200+10%`. If the client resolved 10% to 0.1 before the request, the API would return 200.1 and the percent key would feel wrong. The API document states the rule, and the domain test locks the string the button produces.

## Tokens instead of scattered colors

A dark mode that is a handful of overrides drifts. Each theme is a full `ThemeTokens` object. Components never see a color. The guarantee is a test, not a convention: hardcoded colors outside `tokens.ts` fail the suite, and every token must appear as a CSS variable.

## A fixed card, not a stretched phone

The card has two sizes and does not grow with the window: 292 by 560 upright, and 428 by 408 horizontal. Portrait stacks the extra functions above the common keypad. Landscape keeps the result on top, with the theme control to its left so the two never overlap, and moves the extra functions to the left of the common keys. Keys stay 58 pixels in both orientations. Changing orientation morphs the card instead of swapping layouts in one frame.

A result stays on one line. The type shrinks until it fits. If it still does not fit, or the API rejects the magnitude, the screen says Overflow or Underflow. Sign does not change the word: a huge negative is overflow, and a tiny negative is underflow.

## Fake client in UI tests

Component tests inject `CalculatorClient`. They assert the expression that would cross the network and the text that comes back. Parsing JSON and status codes is tested on the HTTP adapter with a mocked `fetch`. End-to-end behavior against the real API is a manual check, described in the testing notes, because it needs both processes.
