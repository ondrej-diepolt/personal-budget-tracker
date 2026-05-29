# Finance Tracker

Semestrální práce – předmět *Klientské aplikace v JavaScriptu*.

## Cíl projektu

Jednostránková (SPA) aplikace pro správu **osobního měsíčního rozpočtu**.
Uživatel zadává příjmy a výdaje, sleduje zůstatek a strukturu výdajů
(Needs / Wants / Savings) a může data přenášet mezi zařízeními pomocí
exportu/importu (JSON, CSV). Data se ukládají lokálně v prohlížeči
odděleně pro každý měsíc.

## Použité technologie

- **React 19** + **Vite** – komponentová architektura, build a dev server
- **recharts** – grafy (koláčový a sloupcový) renderované jako SVG
- **Vanilla Web Components** – vlastní element `<file-dropzone>` (Shadow DOM)
- **Browser API** – LocalStorage, File API (FileReader), Drag & Drop, Blob

## Postup řešení

1. Návrh datového modelu transakce `{ id, type, name, category, amount }`,
   který je sdílený mezi stavem aplikace, LocalStorage i importem/exportem.
2. Stav rozdělen do vlastních hooků: `useTransactions` (CRUD + perzistence),
   `useMonth` (navigace po měsících), `useBudgetStats` (agregace pro grafy).
   Sdílení napříč komponentami zajišťuje React Context (`BudgetContext`).
3. Výpočetní a pomocná logika oddělena do `src/lib`:
   - jmenný prostor `BudgetUtils` (formátování, práce s datem),
   - třídní hierarchie `Exporter` / `Importer` (abstraktní základ + JSON/CSV
     potomci, template-method pattern),
   - web komponenta `FileDropzone`.
4. UI rozčleněno na sémantické komponenty `Header`, `Dashboard`,
   `TransactionList`, `TransactionRow`.
5. Styly v nativním CSS s vnořováním, přechody, animacemi a media query
   pro responzivitu.

## Popis funkčnosti

- **Editovatelný seznam transakcí** – oddělené tabulky příjmů a výdajů,
  inline editace názvu, kategorie (select) a částky, přidávání a mazání řádků.
- **Měsíční navigace** – přepínání mezi měsíci, každý měsíc má vlastní data.
- **Přehled (Dashboard)** – karty Total Income / Expenses / Balance,
  koláčový graf rozpadu výdajů (Needs/Wants/Savings) a sloupcový graf
  Income vs Expense.
- **Perzistence** – automatické ukládání do LocalStorage pod klíčem
  `budget_YYYY-MM`.
- **Import / Export** – stažení dat jako JSON nebo CSV; import přetažením
  souboru nebo výběrem přes vlastní element `<file-dropzone>`, s validací
  importovaných záznamů.
- **Ukázková data** – tlačítka Small / Medium / Full pro načtení presetů.

## Spuštění

```bash
npm install
npm run dev      # vývojový server
npm run build    # produkční build do dist/
npm run preview  # náhled produkčního buildu
```

## Struktura projektu

```
src/
  components/   Header, Dashboard, TransactionList, TransactionRow
  context/      BudgetContext (sdílení stavu)
  hooks/        useTransactions, useMonth, useBudgetStats
  lib/          BudgetUtils, Exporter, Importer, FileDropzone
  constants/    categories, transactionPresets
  styles/       index.css, App.css
```

## Mapování na požadavky zadání (kde to v kódu je)

| Požadavek | Kde |
|---|---|
| Sémantické značky | `App.jsx` (`main`), `Header.jsx` (`header`), `Dashboard.jsx` (`section`,`article`,`nav`), `TransactionList.jsx` (`section`) |
| Pokročilé CSS selektory | `styles/App.css` – `:nth-child(even)`, `:not():not()`, `>`, `::-webkit-*`, `[type="number"]` |
| CSS transformace 2D/3D | `styles/App.css` – `translateY`, `perspective() rotateX()` (`.stat-card--balance`) |
| CSS transitions/animations | `styles/App.css` – `@keyframes rowEnter`, `transition` |
| Nested CSS | `styles/App.css` – nativní vnořování (`&`, `>`) |
| Media queries | `styles/App.css` – `@media (max-width: 768px)` |
| OOP / dědičnost / namespace | `lib/Exporter.js`, `lib/Importer.js` (dědičnost), `lib/BudgetUtils.js` (namespace) |
| JS knihovna | React + recharts (`Dashboard.jsx`) |
| Pokročilé JS API | LocalStorage (`hooks/useTransactions.js`), File API + Drag&Drop (`lib/FileDropzone.js`, `lib/Importer.js`), Blob (`lib/Exporter.js`) |
| Webová komponenta | `lib/FileDropzone.js` – `<file-dropzone>` |
| SVG grafika | grafy recharts v `Dashboard.jsx` |