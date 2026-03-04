import TransactionRow from './TransactionRow'
import { useBudget } from '../context/BudgetContext'

function TransactionList() {
  const { transactions, addExpense, addIncome } = useBudget()

  const income = transactions.filter(t => t.type === 'Income')
  const expenses = transactions.filter(t => t.type === 'Expense')

  const renderTable = (rows) => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(t => <TransactionRow key={t.id} transaction={t} />)}
      </tbody>
    </table>
  )

  return (
    <div className='transaction-list'>
      <h3>Income</h3>
      {renderTable(income)}
      <h3>Expenses</h3>
      {renderTable(expenses)}
      <button type="button" className='add-transaction' onClick={addIncome}>+ Add Income</button>
      <button type="button" className='add-transaction' onClick={addExpense}>+ Add Expense</button>
    </div>
  )
}

export default TransactionList