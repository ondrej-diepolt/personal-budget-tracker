import { useState, useEffect } from "react";
import { JSONExporter, CSVExporter } from '../lib/Exporter'
import { JSONImporter, CSVImporter } from '../lib/Importer'
import {
  PRESET_FULL,
  PRESET_MEDIUM,
  PRESET_SMALL,
} from "../constants/transactionPresets";

const EXPORTERS = {
  json: JSONExporter,
  csv:  CSVExporter,
}

export function useTransactions(currentMonth) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`budget_${currentMonth}`);
    return saved ? JSON.parse(saved) : PRESET_FULL.map((t) => ({ ...t }));
  });

  useEffect(() => {
    const saved = localStorage.getItem(`budget_${currentMonth}`);
    setTransactions(
      saved ? JSON.parse(saved) : PRESET_FULL.map((t) => ({ ...t })),
    );
  }, [currentMonth]);

  useEffect(() => {
    localStorage.setItem(
      `budget_${currentMonth}`,
      JSON.stringify(transactions),
    );
  }, [transactions, currentMonth]);

  function resetToPreset(preset) {
    setTransactions(preset.map((t) => ({ ...t })));
  }

  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTransaction(id, changes) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    );
  }

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

  function exportFile(format = 'json') {
    const ExporterClass = EXPORTERS[format]
    if (!ExporterClass) {
      console.error(`Unsupported export format: ${format}`)
      return
    }
    const exporter = new ExporterClass()
    exporter.download(transactions, `budget_${currentMonth}`)
  }

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
