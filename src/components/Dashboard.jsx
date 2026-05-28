import { useBudget } from '../context/BudgetContext'
import { useBudgetStats } from '../hooks/useBudgetStats'
import { PieChart, Pie, Cell, Tooltip, Label, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { BudgetUtils } from '../lib/BudgetUtils'


const COLORS = ["#4F46E5", "#818CF8", "#C7D2FE"]

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
    const { transactions, currentMonth, prevMonth, nextMonth, formatLabel  } = useBudget()
    const stats = useBudgetStats(transactions)

    const barData = [
  { type: "Income", amount: stats.totalIncome },
  { type: "Expense", amount: stats.totalExpenses }
]

  return (
    <section className="dashboard">

      <div className="stat-cards">
                <div className="stat-card">
                    <span className="stat-label">TOTAL INCOME</span>
                    <span className="stat-value stat-value--income">
                        {BudgetUtils.formatCZK(stats.totalIncome)}
                    </span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">TOTAL EXPENSES</span>
                    <span className="stat-value stat-value--expense">
                        {BudgetUtils.formatCZK(stats.totalExpenses)}
                    </span>
                </div>
                <div className="stat-card stat-card--balance">
                    <span className="stat-label">BALANCE</span>
                    <span className="stat-value stat-value--balance">
                        {BudgetUtils.formatCZK(stats.balance)}
                    </span>
                </div>
        </div>

        <nav className='month-navigator'>
            <button onClick={prevMonth}>←</button>
            <span>{formatLabel(currentMonth)}</span>
            <button onClick={nextMonth}>→</button>
        </nav>

        <div className="dashboard-charts">
            <article className="chart-card">
                <h3>Expense breakdown</h3>
                <PieChart width={400} height={300}>
                    <Pie data={stats.needsWantsSavings} dataKey="amount" nameKey="category">
                    {stats.needsWantsSavings.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => {
                            const total = stats.needsWantsSavings.reduce(
                            (sum, item) => sum + item.amount,
                            0
                            )
                            const percent = ((value / total) * 100).toFixed(1)
                            return `${percent} %`
                        }}
                    />
                    <Legend />
                </PieChart>
            </article>
            
            <article className="chart-card">
                <h3>Income vs Expense</h3>
                <BarChart width={400} height={300} data={barData}>
                    <XAxis dataKey="type" />
                    <YAxis>
                        <Label
                            value="Kč"
                            position="top"
                        />
                    </YAxis>
                    <Tooltip formatter={(value) => BudgetUtils.formatCZK(value)} />

                    <Bar dataKey="amount">
                        <Cell fill="#4F46E5"/>
                        <Cell fill="#BA1A1A"/>
                    </Bar>

                </BarChart>
                
            </article>

        </div>
    </section>
  )
}

export default Dashboard