# Layout

The reference is a rounded calculator on a soft blue field: a large result, the expression underneath, and a four-column keypad. Light mode colors the figures blue. Dark mode turns the device slate and the figures light. This UI follows that structure. It is not a pixel copy.

## Breakpoints

| Viewport | What you see |
| --- | --- |
| Desktop | Upright card, about 420 by 860, centered on the page gradient |
| Phone portrait, under 680px | The card becomes the screen. No outer margin, no fake bezel fighting the OS chrome |
| Tablet portrait | A larger upright card, up to 560px wide |
| Phone landscape, height under 520px | Full-screen horizontal layout. The result sits on the left and the keypad on the right |
| Tablet landscape, 700 to 1400px wide | The same side-by-side layout inside a rounded card |

Safe-area insets pad the card on devices with a notch. Keys stay at least a comfortable tap target in portrait and shrink to share a short landscape height. A long result steps down through three font sizes instead of overflowing the card.

## Keys

The main grid matches the reference:

```text
C    +/−   %    ÷
7    8     9    ×
4    5     6    −
1    2     3    +
0    .     ⌫    =
```

`√` and `xʸ` sit above the grid as smaller keys. They are the optional power and square-root operations, kept off the main grid so the reference layout stays intact.

The top row and the right column use the accent color of the active theme. Number keys use the neutral text color. The theme toggle reads "Dark mode" or "Light mode" and describes the mode it will switch to.

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
