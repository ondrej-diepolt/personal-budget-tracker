// useTransactions — owns the transaction data for the currently selected month.
// Handles state, LocalStorage persistence, all CRUD actions, plus delegating
// export and import to the Exporter / Importer class hierarchies.
import { useState, useEffect } from "react";
import { JSONExporter, CSVExporter } from '../lib/Exporter'
import { JSONImporter, CSVImporter } from '../lib/Importer'

import {
  PRESET_FULL,
  PRESET_MEDIUM,
  PRESET_SMALL,
} from "../constants/transactionPresets";

// Registry of supported export formats — easy to extend by adding a new key + class.
const EXPORTERS = {
  json: JSONExporter,
  csv:  CSVExporter,
}

export function useTransactions(currentMonth) {
  // Initial load — pick up saved transactions for this month from LocalStorage,
  // otherwise fall back to the full preset.
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`budget_${currentMonth}`);
    return saved ? JSON.parse(saved) : PRESET_FULL.map((t) => ({ ...t }));
  });

  // Re-load when the user switches months (each month has its own LocalStorage key).
  useEffect(() => {
    const saved = localStorage.getItem(`budget_${currentMonth}`);
    setTransactions(
      saved ? JSON.parse(saved) : PRESET_FULL.map((t) => ({ ...t })),
    );
  }, [currentMonth]);

  // Persist on every change — keyed by the current month so months don't overwrite each other.
  useEffect(() => {
    localStorage.setItem(
      `budget_${currentMonth}`,
      JSON.stringify(transactions),
    );
  }, [transactions, currentMonth]);

  // Replace all transactions with a copy of the given preset (Small / Medium / Full).
  function resetToPreset(preset) {
    setTransactions(preset.map((t) => ({ ...t })));
  }

  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // Merge changes into the transaction with the given id (used by inline editing).
  function updateTransaction(id, changes) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    );
  }

  // Append a new empty expense row with a unique id (max existing id + 1).
  function addExpense() {
    const newId =
      transactions.length === 0
        ? 1
        : Math.max(...transactions.map((t) => t.id)) + 1;
    setTransactions((prev) => [
      ...prev,
      {
        id: newId,
        type: "Expense",
        name: "New expense",
        category: "Other",
        amount: 0,
      },
    ]);
  }

  function addIncome() {
    const newId =
      transactions.length === 0
        ? 1
        : Math.max(...transactions.map((t) => t.id)) + 1;
    setTransactions((prev) => [
      ...prev,
      {
        id: newId,
        type: "Income",
        name: "New income",
        category: "Primary income",
        amount: 0,
      },
    ]);
  }

  // Picks the right Exporter subclass from the registry and triggers a download.
  function exportFile(format = 'json') {
    const ExporterClass = EXPORTERS[format]
    if (!ExporterClass) {
      console.error(`Unsupported export format: ${format}`)
      return
    }
    const exporter = new ExporterClass()
    exporter.download(transactions, `budget_${currentMonth}`)
  }

  // Picks the right Importer based on file extension, validates the rows,
  // and replaces current transactions (with a confirmation if some rows failed validation).
  async function importFile(file) {
    const isJSON   = file.name.endsWith('.json')
    const importer = isJSON ? new JSONImporter() : new CSVImporter()
    const result   = await importer.import(file)
    if (result.errors.length === 0 || confirm(`${result.errors.length} chyb, importovat ${result.valid.length} platných?`)) {
      setTransactions(result.valid)
    }
  }

  return {
    transactions,
    resetToPreset,
    updateTransaction,
    addExpense,
    addIncome,
    removeTransaction,
    exportFile,
    importFile,
  };
}