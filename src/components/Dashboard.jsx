import { useBudget } from '../context/BudgetContext'
import { useBudgetStats } from '../hooks/useBudgetStats'

function Dashboard() {
    const { transactions } = useBudget()
    const stats = useBudgetStats(transactions)

   console.log('stats:', stats)

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Income: {stats.totalIncome} Kč</p>
      <p>Expense: {stats.totalExpenses} Kč</p>
      <p>Balance: {stats.balance} Kč</p>
    </div>
  )
}

export default Dashboard