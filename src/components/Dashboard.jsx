import { useBudget } from '../context/BudgetContext'
import { useBudgetStats } from '../hooks/useBudgetStats'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'


const COLORS = [
 "#f2b07a",
 "#d96b3b",
 "#c4a484"
]

// ['#b5451b', '#e09b3d', '#1BB596', ]

// [
//  "#b5451b",
//  "#d96b3b",
//  "#f2b07a"
// ]

// [
//  "#b5451b",
//  "#c9a227",
//  "#1BB596"
// ]

// [
//  "#a44a2a",
//  "#c4a484",
//  "#3c9a8b"
// ]

function Dashboard() {
    const { transactions } = useBudget()
    const stats = useBudgetStats(transactions)

   console.log('stats:', stats)

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* <div>
        <p>Income: {stats.totalIncome} Kč</p>
        <p>Expense: {stats.totalExpenses} Kč</p>
        <p>Balance: {stats.balance} Kč</p>
      </div> */}

        <div className="dashboard-charts">
            <div>
                <h3>Výdaje podle kategorie</h3>
                <PieChart width={400} height={300}>
                    <Pie data={stats.expenseBreakdown} dataKey="amount" nameKey="category">
                    {stats.expenseBreakdown.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} Kč`} />
                    <Legend />
                </PieChart>
            </div>
            
            <div>
                <h3>Příjmy podle kategorie</h3>
                <PieChart width={400} height={300}>
                    <Pie data={stats.incomeBreakdown} dataKey="amount" nameKey="category">
                    {stats.incomeBreakdown.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} Kč`} />
                    <Legend />
                </PieChart>
            </div>

        </div>
    </div>
  )
}

export default Dashboard