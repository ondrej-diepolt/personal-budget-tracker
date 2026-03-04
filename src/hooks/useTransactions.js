import { useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState([
    //NEEDS
    {
      id: 1,
      type: "Income",
      name: "Salary",
      category: "Primary income",
      amount: 0,
    },
    {
      id: 2,
      type: "Expense",
      name: "Rent / Mortgage",
      category: "Housing",
      amount: 0,
    },
    {
      id: 3,
      type: "Expense",
      name: "Electricity",
      category: "Housing",
      amount: 0,
    },
    { id: 4, type: "Expense", name: "Gas", category: "Housing", amount: 0 },
    { id: 5, type: "Expense", name: "Water", category: "Housing", amount: 0 },
    {
      id: 6,
      type: "Expense",
      name: "Internet",
      category: "Housing",
      amount: 0,
    },
    {
      id: 7,
      type: "Expense",
      name: "Home insurance",
      category: "Housing",
      amount: 0,
    },
    {
      id: 8,
      type: "Expense",
      name: "Grocerie",
      category: "Food",
      amount: 0,
    },
    {
      id: 9,
      type: "Expense",
      name: "Public transport",
      category: "Transportation",
      amount: 0,
    },
    {
      id: 10,
      type: "Expense",
      name: "Fuel",
      category: "Transportation",
      amount: 0,
    },
    {
      id: 11,
      type: "Expense",
      name: "Car insurance",
      category: "Transportation",
      amount: 0,
    },
    {
      id: 12,
      type: "Expense",
      name: "Health insurance",
      category: "Health",
      amount: 0,
    },
    {
      id: 13,
      type: "Expense",
      name: "Medicine",
      category: "Health",
      amount: 0,
    },
    {
      id: 14,
      type: "Expense",
      name: "Taxes",
      category: "Mandatory payments",
      amount: 0,
    },
    {
      id: 15,
      type: "Expense",
      name: "Mobile phone plan",
      category: "Communication",
      amount: 0,
    },

    //WANTS
    {
      id: 16,
      type: "Expense",
      name: "Restaurants",
      category: "Restaurants & Cafes",
      amount: 0,
    },

    {
      id: 17,
      type: "Expense",
      name: "Cafes",
      category: "Restaurants & Cafes",
      amount: 0,
    },

    {
      id: 18,
      type: "Expense",
      name: "Food delivery",
      category: "Restaurants & Cafes",
      amount: 0,
    },

    {
      id: 19,
      type: "Expense",
      name: "Food delivery",
      category: "Restaurants & Cafes",
      amount: 0,
    },
    {
      id: 20,
      type: "Expense",
      name: "Streaming services",
      category: "Entertainment",
      amount: 0,
    },
    {
      id: 21,
      type: "Expense",
      name: "Concerts",
      category: "Entertainment",
      amount: 0,
    },
    {
      id: 22,
      type: "Expense",
      name: "Cinema",
      category: "Entertainment",
      amount: 0,
    },
    {
      id: 23,
      type: "Expense",
      name: "Video games",
      category: "Entertainment",
      amount: 0,
    },
    {
      id: 24,
      type: "Expense",
      name: "Clothes",
      category: "Shopping",
      amount: 0,
    },
    {
      id: 25,
      type: "Expense",
      name: "Accessories",
      category: "Shopping",
      amount: 0,
    },
    {
      id: 26,
      type: "Expense",
      name: "Electronics",
      category: "Shopping",
      amount: 0,
    },
    {
      id: 27,
      type: "Expense",
      name: "Vacations",
      category: "Travel",
      amount: 0,
    },
    {
      id: 28,
      type: "Expense",
      name: "Netflix",
      category: "Subscriptions",
      amount: 0,
    },

    //SAVINGS
    {
      id: 29,
      type: "Expense",
      name: "Savings account",
      category: "Emergency fund",
      amount: 0,
    },
    {
      id: 30,
      type: "Expense",
      name: "Stocks",
      category: "Investments",
      amount: 0,
    },
    {
      id: 31,
      type: "Expense",
      name: "Credit card payments",
      category: "Debt repayment",
      amount: 0,
    },

    // INCOME
    {
      id: 32,
      type: "Income",
      name: "Bonus",
      category: "Primary income",
      amount: 0,
    },
    {
      id: 33,
      type: "Income",
      name: "Dividends",
      category: "Investments",
      amount: 0,
    },
    {
      id: 34,
      type: "Income",
      name: "Interest income",
      category: "Investments",
      amount: 0,
    },
    {
      id: 35,
      type: "Income",
      name: "Other income",
      category: "Other income",
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
        type: "Expense",
        name: "New",
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
