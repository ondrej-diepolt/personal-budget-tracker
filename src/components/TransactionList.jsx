import TransactionRow from './TransactionRow'
import { useBudget } from '../context/BudgetContext'

function TransactionList() {
  const { transactions, addTransaction } = useBudget()

  return (
    <form onSubmit={(e) => e.preventDefault()}
    className='transaction-list'>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>
      <button type="button" className='add-transaction' onClick={addTransaction}>
        Add Income
      </button>
      <button type="button" className='add-transaction' onClick={addTransaction}>
        Add Expense
      </button>
    </form>
  )
}

export default TransactionList