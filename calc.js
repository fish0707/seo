/* CalcMate — a safe calculator engine (no eval) with a shunting-yard parser. */
(function () {
  "use strict";

  // ---- Safe expression evaluator ------------------------------------------
  const FUNCS = {
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    sqrt: (x) => Math.sqrt(x),
    square: (x) => x * x,
    inv: (x) => 1 / x,
    fact: (x) => factorial(x),
  };

  const OPS = {
    "+": { prec: 1, assoc: "L", fn: (a, b) => a + b },
    "-": { prec: 1, assoc: "L", fn: (a, b) => a - b },
    "*": { prec: 2, assoc: "L", fn: (a, b) => a * b },
    "/": { prec: 2, assoc: "L", fn: (a, b) => a / b },
    "%": { prec: 2, assoc: "L", fn: (a, b) => a % b },
    "^": { prec: 4, assoc: "R", fn: (a, b) => Math.pow(a, b) },
  };

  const CONSTS = { pi: Math.PI, e: Math.E };

  function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n > 170) return Infinity;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  function tokenize(input) {
    const tokens = [];
    let i = 0;
    const s = input.replace(/\s+/g, "");
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) {
        let num = "";
        while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
        if ((num.match(/\./g) || []).length > 1) throw new Error("bad number");
        tokens.push({ type: "num", value: parseFloat(num) });
        continue;
      }
      if (/[a-z]/i.test(c)) {
        let name = "";
        while (i < s.length && /[a-z]/i.test(s[i])) name += s[i++].toLowerCase();
        if (name in FUNCS) tokens.push({ type: "func", value: name });
        else if (name in CONSTS) tokens.push({ type: "num", value: CONSTS[name] });
        else throw new Error("unknown: " + name);
        continue;
      }
      if (c in OPS) {
        // Detect unary minus/plus.
        const prev = tokens[tokens.length - 1];
        const unary = !prev || prev.type === "op" || prev.value === "(";
        if ((c === "-" || c === "+") && unary) {
          tokens.push({ type: "num", value: 0 });
        }
        tokens.push({ type: "op", value: c });
        i++;
        continue;
      }
      if (c === "(" || c === ")") {
        tokens.push({ type: "paren", value: c });
        i++;
        continue;
      }
      throw new Error("bad char: " + c);
    }
    return tokens;
  }

  function toRPN(tokens) {
    const out = [];
    const stack = [];
    for (const t of tokens) {
      if (t.type === "num") out.push(t);
      else if (t.type === "func") stack.push(t);
      else if (t.type === "op") {
        while (stack.length) {
          const top = stack[stack.length - 1];
          if (top.type === "func") { out.push(stack.pop()); continue; }
          if (top.type === "op") {
            const o1 = OPS[t.value], o2 = OPS[top.value];
            if ((o1.assoc === "L" && o1.prec <= o2.prec) ||
                (o1.assoc === "R" && o1.prec < o2.prec)) {
              out.push(stack.pop());
              continue;
            }
          }
          break;
        }
        stack.push(t);
      } else if (t.value === "(") stack.push(t);
      else if (t.value === ")") {
        while (stack.length && stack[stack.length - 1].value !== "(")
          out.push(stack.pop());
        if (!stack.length) throw new Error("mismatched )");
        stack.pop();
        if (stack.length && stack[stack.length - 1].type === "func")
          out.push(stack.pop());
      }
    }
    while (stack.length) {
      const t = stack.pop();
      if (t.value === "(") throw new Error("mismatched (");
      out.push(t);
    }
    return out;
  }

  function evalRPN(rpn) {
    const st = [];
    for (const t of rpn) {
      if (t.type === "num") st.push(t.value);
      else if (t.type === "func") {
        if (st.length < 1) throw new Error("bad expr");
        st.push(FUNCS[t.value](st.pop()));
      } else if (t.type === "op") {
        if (st.length < 2) throw new Error("bad expr");
        const b = st.pop(), a = st.pop();
        st.push(OPS[t.value].fn(a, b));
      }
    }
    if (st.length !== 1) throw new Error("bad expr");
    return st[0];
  }

  function evaluate(expr) {
    const value = evalRPN(toRPN(tokenize(expr)));
    if (!Number.isFinite(value)) {
      if (Number.isNaN(value)) throw new Error("undefined");
      throw new Error("infinity");
    }
    return value;
  }

  // ---- UI state -----------------------------------------------------------
  const expEl = document.getElementById("expression");
  const resEl = document.getElementById("result");
  const historyList = document.getElementById("history-list");
  const historyEmpty = document.getElementById("history-empty");

  let expr = "";       // raw expression the engine parses
  let display = "";    // pretty version shown to the user
  let justEvaluated = false;

  const PRETTY = { "*": " × ", "/": " ÷ ", "-": " − ", "+": " + ", "^": " ^ ", "%": " mod " };

  function render() {
    let out = expr;
    for (const [k, v] of Object.entries(PRETTY)) out = out.split(k).join(v);
    out = out.replace(/pi/g, "π").replace(/sqrt/g, "√").replace(/fact/g, "!")
             .replace(/square/g, "sq").replace(/inv/g, "1/");
    expEl.textContent = out;
    resEl.classList.remove("error");
    if (!expr) { resEl.textContent = "0"; return; }
    try {
      const v = evaluate(expr);
      resEl.textContent = format(v);
    } catch (_) {
      resEl.textContent = display || "0";
    }
  }

  function format(n) {
    if (Object.is(n, -0)) n = 0;
    const rounded = Math.round(n * 1e12) / 1e12;
    if (Math.abs(rounded) >= 1e15 || (rounded !== 0 && Math.abs(rounded) < 1e-9))
      return rounded.toExponential(6).replace(/\.?0+e/, "e");
    return String(rounded);
  }

  function push(str) {
    if (justEvaluated && /[0-9.]/.test(str[0])) { expr = ""; }
    justEvaluated = false;
    expr += str;
    render();
  }

  function pushOp(op) {
    justEvaluated = false;
    if (!expr && (op === "*" || op === "/" || op === "^" || op === "%")) return;
    if (expr && /[+\-*/^%]$/.test(expr)) expr = expr.slice(0, -1);
    expr += op;
    render();
  }

  function pushFunc(name) {
    justEvaluated = false;
    if (name === "square" || name === "inv" || name === "fact") {
      // postfix-style: wrap current expression
      if (!expr) return;
      expr = name + "(" + expr + ")";
    } else {
      expr += name + "(";
    }
    render();
  }

  function clearAll() { expr = ""; justEvaluated = false; render(); }
  function backspace() {
    justEvaluated = false;
    // remove trailing function name + "(" together when applicable
    const m = expr.match(/([a-z]+\()$/);
    if (m) expr = expr.slice(0, -m[1].length);
    else expr = expr.slice(0, -1);
    render();
  }

  function equals() {
    if (!expr) return;
    try {
      const v = evaluate(expr);
      const result = format(v);
      addHistory(expEl.textContent, result);
      expr = String(v);
      justEvaluated = true;
      expEl.textContent = "";
      resEl.textContent = result;
      resEl.classList.remove("error");
    } catch (err) {
      resEl.textContent = "Error";
      resEl.classList.add("error");
    }
  }

  // ---- History ------------------------------------------------------------
  let history = [];
  try { history = JSON.parse(localStorage.getItem("calcmate.history") || "[]"); } catch (_) {}

  function saveHistory() {
    try { localStorage.setItem("calcmate.history", JSON.stringify(history.slice(0, 50))); } catch (_) {}
  }
  function addHistory(exprText, result) {
    history.unshift({ expr: exprText, result });
    saveHistory();
    renderHistory();
  }
  function renderHistory() {
    historyList.innerHTML = "";
    historyEmpty.hidden = history.length > 0;
    history.slice(0, 50).forEach((h) => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = `<span class="hx-expr">${escapeHtml(h.expr)}</span><span class="hx-res">${escapeHtml(h.result)}</span>`;
      li.addEventListener("click", () => {
        expr = h.result; justEvaluated = true; render();
      });
      historyList.appendChild(li);
    });
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---- Wiring -------------------------------------------------------------
  document.querySelectorAll(".key").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.num != null) push(btn.dataset.num);
      else if (btn.dataset.op != null) pushOp(btn.dataset.op);
      else if (btn.dataset.insert != null) { justEvaluated = false; expr += btn.dataset.insert; render(); }
      else if (btn.dataset.const != null) { push(btn.dataset.const); }
      else if (btn.dataset.fn != null) pushFunc(btn.dataset.fn);
      else if (btn.dataset.action === "clear") clearAll();
      else if (btn.dataset.action === "backspace") backspace();
      else if (btn.dataset.action === "equals") equals();
    });
  });

  document.getElementById("clear-history").addEventListener("click", () => {
    history = []; saveHistory(); renderHistory();
  });

  // Mode switching
  const sci = document.getElementById("keys-sci");
  document.querySelectorAll(".mode-btn").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach((x) => {
        x.classList.remove("is-active"); x.setAttribute("aria-selected", "false");
      });
      b.classList.add("is-active"); b.setAttribute("aria-selected", "true");
      sci.hidden = b.dataset.mode !== "scientific";
    });
  });

  // Theme
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("calcmate.theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.setAttribute("data-theme", "dark");
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", cur);
    localStorage.setItem("calcmate.theme", cur);
  });

  // Keyboard support
  window.addEventListener("keydown", (e) => {
    const k = e.key;
    if (/[0-9.]/.test(k)) { push(k); flash(`[data-num="${k}"]`); }
    else if (k === "+" || k === "-" || k === "*" || k === "/" || k === "%" || k === "^") {
      pushOp(k); flash(`[data-op="${k.replace(/[\\"]/g, "")}"]`);
    }
    else if (k === "(" || k === ")") { justEvaluated = false; expr += k; render(); }
    else if (k === "Enter" || k === "=") { e.preventDefault(); equals(); flash('[data-action="equals"]'); }
    else if (k === "Backspace") { backspace(); flash('[data-action="backspace"]'); }
    else if (k === "Escape") { clearAll(); flash('[data-action="clear"]'); }
  });
  function flash(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 100);
  }

  // Init
  renderHistory();
  render();
})();
