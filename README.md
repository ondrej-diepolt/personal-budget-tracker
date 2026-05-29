# Finance Tracker

Semester project — course *Client Applications in JavaScript*.

A single-page application (SPA) for managing a **personal monthly budget**. The
user records income and expenses, watches the running balance and the structure
of their spending (Needs / Wants / Savings), and can move data between devices
via JSON / CSV export and import. Data is stored locally in the browser,
separately for each month.

## Goal

Build a self-contained client-side budgeting tool that needs no backend: all
state lives in the browser, all computation happens on the client, and the user
can persist, transfer and restore their data without any server round-trip.

## Tech stack

- **React 19 + Vite** — component architecture, dev server and production build
- **recharts** — pie and bar charts rendered as inline SVG
- **Vanilla Web Components** — custom `<file-dropzone>` element with its own Shadow DOM
- **Browser APIs** — LocalStorage, File API (FileReader), Drag & Drop, Blob

## How it works (approach)

1. **One shared data model.** Every transaction is `{ id, type, name, category, amount }`.
   The same shape is used by the application state, LocalStorage, and the
   import/export layer, so a preset or an imported file can become the current
   state without any conversion.
2. **State lives in custom hooks.** `useTransactions` (CRUD + persistence),
   `useMonth` (month navigation) and `useBudgetStats` (aggregation for the
   charts). They are shared across the component tree through a React Context
   (`BudgetContext`).
3. **Logic is separated into `src/lib`.** A `BudgetUtils` namespace (formatting,
   date handling), an `Exporter` / `Importer` class hierarchy (abstract base +
   JSON / CSV subclasses, template-method pattern), and the `FileDropzone` web
   component.
4. **UI is split into semantic components** — `Header`, `Dashboard`,
   `TransactionList`, `TransactionRow`.
5. **Styling is native CSS** with nesting, transitions, a keyframe animation and
   a media query for responsiveness.

## Functionality

- **Editable transaction list** — separate Income and Expense tables with inline
  editing of name, category (select) and amount, plus adding and removing rows.
- **Monthly navigation** — switch between months; each month keeps its own data.
- **Dashboard** — Total Income / Total Expenses / Balance cards, a pie chart of
  the spending split (Needs / Wants / Savings) and a bar chart of Income vs Expense.
- **Persistence** — automatic save to LocalStorage under the key `budget_YYYY-MM`.
- **Import / Export** — download the data as JSON or CSV; import by dragging a
  file onto the custom `<file-dropzone>` element or by clicking to browse, with
  validation of the imported records.
- **Sample data** — Small / Medium / Full preset buttons.
- **Responsive layout** — adapts from desktop down to mobile widths.

## Getting started

Requires Node.js 20.19+ or 22.12+ (Vite 7).

```bash
npm install
npm run dev      # development server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   Header, Dashboard, TransactionList, TransactionRow
  context/      BudgetContext (shared state)
  hooks/        useTransactions, useMonth, useBudgetStats
  lib/          BudgetUtils, Exporter, Importer, FileDropzone
  constants/    categories, transactionPresets
  styles/       index.css, App.css
```

## Implemented features by requirement

What the project uses and where it lives in the source.

### HTML5

| Feature | Implementation |
|---|---|
| Semantic elements | `header` (`Header.jsx`), `main` (`App.jsx`), `section` + `nav` + `article` (`Dashboard.jsx`), `section` (`TransactionList.jsx`) |
| SVG graphics | Pie and bar charts rendered as inline SVG — `Dashboard.jsx` (recharts) |
| Form elements | Input `type` number / text / file, `placeholder`, `autofocus` (first income row), client-side validation via `min` / `max` / `maxLength` and import-record validation — `TransactionRow.jsx`, `FileDropzone.js`, `Importer.js` |

### CSS

| Feature | Implementation |
|---|---|
| Advanced selectors | `:nth-child(even)`, chained `:not():not()`, child combinator `>`, attribute selector `[type="number"]`, `::-webkit-*` pseudo-elements — `styles/App.css` |
| 2D / 3D transforms | `translateY` (2D) and `perspective() rotateX()` (3D) on the balance card hover — `styles/App.css` |
| Transitions & animations | `@keyframes rowEnter` row entrance animation, `transition` on buttons and cards — `styles/App.css` |
| Media queries | Layout collapses to a single column and the data row restacks at `max-width: 768px` — `styles/App.css` |
| Nested CSS | Native nesting with `&` and `>` — `styles/App.css` |

### JavaScript

| Feature | Implementation |
|---|---|
| OOP — prototypal inheritance & namespace | `Exporter` -> `JSONExporter` / `CSVExporter` and `Importer` -> `JSONImporter` / `CSVImporter` (abstract base + template-method pattern); `BudgetUtils` namespace object; private class field `#emit` — `lib/Exporter.js`, `lib/Importer.js`, `lib/BudgetUtils.js`, `lib/FileDropzone.js` |
| JS library / framework | React 19 (components, hooks, context) and recharts (charts) — across `src/` and `Dashboard.jsx` |
| Advanced browser APIs | LocalStorage (per-month persistence) — `hooks/useTransactions.js`; File API / FileReader (import) — `lib/Importer.js`; Drag & Drop (`dataTransfer`) — `lib/FileDropzone.js`; Blob + `URL.createObjectURL` (export) — `lib/Exporter.js` |
| Web Component | `<file-dropzone>` custom element with Shadow DOM and a `CustomEvent` bridge to React — `lib/FileDropzone.js` |