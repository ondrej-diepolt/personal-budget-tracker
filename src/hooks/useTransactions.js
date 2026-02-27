import { useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: "příjem", name: "Wage", amount: 0 },
    { id: 2, type: "výdaj", name: "Rent", amount: 0 },
    { id: 3, type: "výdaj", name: "Energy", amount: 0 },
    { id: 4, type: "výdaj", name: "Groceries", amount: 0 },
    { id: 5, type: "výdaj", name: "Fuel", amount: 0 },
    { id: 6, type: "výdaj", name: "Clothing", amount: 0 },
    { id: 7, type: "výdaj", name: "Subscriptions", amount: 0 },
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
        type: "výdaj",
        name: "Nová položka",
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
