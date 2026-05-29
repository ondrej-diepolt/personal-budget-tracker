// useBudgetStats — derives summary statistics from a list of transactions.
// Pure computation, no state — runs on every render of the Dashboard.
import {
  NEEDS_CATEGORIES,
  WANTS_CATEGORIES,
  SAVINGS_CATEGORIES,
} from "../constants/categories";

export function useBudgetStats(transactions) {
  const expenses = transactions.filter((t) => t.type === "Expense");
  const income = transactions.filter((t) => t.type === "Income");

  // Helper: sum the amounts of all expenses whose category falls into the given group.
  const sumByCategories = (cats) =>
    expenses
      .filter((t) => cats.includes(t.category))
      .reduce((sum, t) => sum + t.amount, 0);

  // Group expense totals by the classic 50/30/20-style buckets.
  const needs = sumByCategories(NEEDS_CATEGORIES);
  const wants = sumByCategories(WANTS_CATEGORIES);
  const savings = sumByCategories(SAVINGS_CATEGORIES);

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    // Shape expected by the PieChart on the dashboard.
    needsWantsSavings: [
      { category: "Needs", amount: needs },
      { category: "Wants", amount: wants },
      { category: "Savings", amount: savings },
    ],
    incomeBreakdown: income
      .filter((t) => t.amount > 0)
      .map((t) => ({ category: t.name, amount: t.amount })),
  };
}