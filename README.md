# CalcMate

A fast, elegant calculator web app — no build step, no dependencies.

![CalcMate](https://img.shields.io/badge/status-ready-4f6bff)

## Features

- **Standard & Scientific modes** — basic arithmetic plus `sin`, `cos`, `tan`, `ln`, `log`, `√`, `x^y`, `n!`, `1/x`, `x²`, `π`, `e`, and `mod`.
- **Safe evaluation** — expressions are parsed with a hand-written tokenizer and shunting-yard algorithm. **No `eval()`**, so user input is never executed as code.
- **Keyboard support** — type digits, operators, `(`, `)`, `Enter`/`=` to evaluate, `Backspace` to delete, `Esc` to clear.
- **History** — the last 50 calculations are stored in `localStorage`; click any entry to reuse its result.
- **Light / dark theme** — respects your system preference and remembers your choice.
- **Responsive** — works full-screen on mobile.

## Usage

Open `index.html` in any modern browser. That's it — everything is static.

To serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup and layout |
| `styles.css` | Theme, layout, and component styling |
| `calc.js` | Expression engine, UI wiring, history, keyboard, theming |

## How it works

`calc.js` evaluates expressions in three stages:

1. **Tokenize** — split the input string into numbers, operators, functions, constants, and parentheses (handling unary `+`/`-`).
2. **Shunting-yard** — convert the token stream to Reverse Polish Notation, respecting operator precedence and associativity.
3. **Evaluate RPN** — walk the RPN stack to produce the result, guarding against `NaN` / `Infinity`.

Results are rounded to 12 significant places and switch to exponential notation for very large or very small magnitudes.
