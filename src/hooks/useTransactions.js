import { useState } from "react";
import {
  PRESET_FULL,
  PRESET_MEDIUM,
  PRESET_SMALL,
} from "../constants/transactionPresets";

export function useTransactions() {
  const [transactions, setTransactions] = useState(PRESET_FULL);

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

  return {
    transactions,
    resetToPreset,
    updateTransaction,
    addExpense,
    addIncome,
    removeTransaction,
  };
}
