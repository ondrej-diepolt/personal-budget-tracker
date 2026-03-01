import { useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income", name: "Wage", category: "Other", amount: 0 },
    { id: 2, type: "expense", name: "Rent", category: "Other", amount: 0 },
    { id: 3, type: "expense", name: "Energy", category: "Other", amount: 0 },
    { id: 4, type: "expense", name: "Groceries", category: "Other", amount: 0 },
    { id: 5, type: "expense", name: "Fuel", category: "Other", amount: 0 },
    { id: 6, type: "expense", name: "Clothing", category: "Other", amount: 0 },
    {
      id: 7,
      type: "expense",
      name: "Subscriptions",
      category: "Other",
      amount: 0,
    },
  ]);

  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTransaction(id, changes) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    );
  }

  function addTransaction() {
    const newId =
      transactions.length === 0
        ? 1
        : Math.max(...transactions.map((t) => t.id)) + 1;

    setTransactions((prev) => [
      ...prev,
      {
        id: newId,
        type: "expense",
        name: "Mew",
        category: "Other",
        amount: 0,
      },
    ]);
  }

  return {
    transactions,
    updateTransaction,
    addTransaction,
    removeTransaction,
  };
}
