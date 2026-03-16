import { useState, useEffect } from "react";
import {
  PRESET_FULL,
  PRESET_MEDIUM,
  PRESET_SMALL,
} from "../constants/transactionPresets";

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

  function exportFile() {
    const json = JSON.stringify(transactions, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "budget.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    transactions,
    resetToPreset,
    updateTransaction,
    addExpense,
    addIncome,
    removeTransaction,
    exportFile,
  };
}
