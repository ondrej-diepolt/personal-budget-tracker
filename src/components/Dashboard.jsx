// Dashboard
// Renders three summary stat cards (Income, Expenses, Balance), a month navigator,
// and two charts: pie chart for needs/wants/savings split, bar chart for income vs expense.
import { useBudget } from '../context/BudgetContext'
import { useBudgetStats } from '../hooks/useBudgetStats'
import { PieChart, Pie, Cell, Tooltip, Label, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import { BudgetUtils } from '../lib/BudgetUtils'


// Indigo palette used for the PieChart slices (Needs / Wants / Savings).
const COLORS = ["#4F46E5", "#818CF8", "#C7D2FE"]

function Dashboard() {
    // Pull current month state and actions from the global BudgetContext,
    // then compute derived statistics from the current month's transactions.
    const { transactions, currentMonth, prevMonth, nextMonth, formatLabel  } = useBudget()
    const stats = useBudgetStats(transactions)

    // Data shape required by the Recharts BarChart (one row per bar).
    const barData = [
  { type: "Income", amount: stats.totalIncome },
  { type: "Expense", amount: stats.totalExpenses }
]

  return (
    <section className="dashboard">

      {/* Stat cards row — totals and overall balance */}
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

        {/* Month navigator — previous / current label / next month */}
        <nav className='month-navigator'>
            <button onClick={prevMonth}>←</button>
            <span>{formatLabel(currentMonth)}</span>
            <button onClick={nextMonth}>→</button>
         </nav>

        {/* Charts row — pie chart for expense category split, bar chart for income vs expense */}
        <div className="dashboard-charts">
            <article className="chart-card">
                <h2>Expense breakdown</h2>
                <PieChart width={400} height={300}>
                    <Pie data={stats.needsWantsSavings} dataKey="amount" nameKey="category">
                    {stats.needsWantsSavings.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => {
                            // Convert raw amount to percentage of total for the tooltip label.
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
                <h2>Income vs Expense</h2>
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