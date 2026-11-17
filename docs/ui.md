# Layout

The reference is a rounded calculator on a soft blue field: a large result, the expression underneath, and a four-column keypad. Light mode colors the figures blue. Dark mode turns the device slate and the figures light. This UI follows that structure. It is not a pixel copy.

## Breakpoints

| Viewport | What you see |
| --- | --- |
| Portrait | Fixed upright card, 292 by 560, centered. The page background stays visible around it |
| Landscape | Fixed horizontal card, 428 by 408. The theme control sits to the left of the result. Functions sit on the left and the common keys on the right. Keys keep the same size |

The card does not stretch with the window, so the page color stays visible around it. The card has a short lower edge in the same color family as its face, so it reads as a thin slab. Turning the window between portrait and landscape morphs the card instead of jumping.

A long result stays on one line. The type shrinks until it fits beside the theme control, and the expression underneath is a single ellipsized line. A result past the numeric range shows Overflow or Underflow, for both positive and negative values. Hover darkens a key in light mode and lightens it in dark mode.

## Keys

The result stays above the keys. In portrait the extra functions are their own band. In landscape that band moves to the left and the everyday keypad stays on the right.

```text
√    xʸ    +/−   %
C         ⌫

7    8     9    ÷
4    5     6    ×
1    2     3    −
0    .     +    =
```

Number keys use the neutral surface. `√`, `xʸ`, `+/−`, `%`, clear, and backspace use the quieter function color. Divide, multiply, subtract, add, and equals use the stronger operator color. Both colors come from the theme tokens. The theme toggle reads "Dark mode" or "Light mode" and describes the mode it will switch to.

## Keyboard

| Key | Action |
| --- | --- |
| `0-9` `.` | Type the current number |
| `+ - * / ^` | Operators |
| `%` | Percent |
| Enter or `=` | Evaluate |
| Backspace | Delete |
| Escape or `c` | Clear |
| `s` | Square root |

The result is an `output` inside a polite live region, so a screen reader hears the new value.
