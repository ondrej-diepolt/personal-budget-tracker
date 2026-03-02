export function useBudgetStats(transactions) {
  const income = transactions.filter((t) => t.type === "Income");
  const expenses = transactions.filter((t) => t.type === "Expense");

  const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = totalIncome - totalExpenses;

  const expenseBreakdown = Object.values(
    expenses
      .filter((t) => Number(t.amount) > 0)
      .reduce((acc, t) => {
        const cat = t.category;
        if (!acc[cat]) acc[cat] = { category: cat, amount: 0 };
        acc[cat].amount += Number(t.amount);
        return acc;
      }, {}),
  );

  const incomeBreakdown = Object.values(
    income
      .filter((t) => Number(t.amount) > 0)
      .reduce((acc, t) => {
        const cat = t.category;
        if (!acc[cat]) acc[cat] = { category: cat, amount: 0 };
        acc[cat].amount += Number(t.amount);
        return acc;
      }, {}),
  );

  return {
    totalIncome,
    totalExpenses,
    balance,
    expenseBreakdown,
    incomeBreakdown,
  };
}
