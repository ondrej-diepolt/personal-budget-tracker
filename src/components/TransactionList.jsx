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
            <th>Typ</th>
            <th>Název</th>
            <th>Částka</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addTransaction}>
        + Add
      </button>
    </form>
  )
}

export default TransactionList