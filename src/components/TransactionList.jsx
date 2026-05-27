import { useRef } from 'react'
import TransactionRow from './TransactionRow'
import { useBudget } from '../context/BudgetContext'
import { PRESET_FULL, PRESET_MEDIUM, PRESET_SMALL } from '../constants/transactionPresets'

function TransactionList() {
  const { transactions, addExpense, addIncome, resetToPreset, exportFile, importFile } = useBudget()
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) importFile(file)
    e.target.value = ''
  }
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
      <div className='transaction-list-header'>
        <h2>Transactions</h2>
        <span className='transaction-list-meta'>
          {transactions.length} records
        </span>
      </div>
      
      <p className='section-label'>Income</p>
      {renderTable(income, 'Income')}
      <button type="button" className='add-transaction' onClick={addIncome}>
        + Add Income
      </button>

      <p className='section-label'>Expenses</p>
      {renderTable(expenses, 'Expense')}
      <button type="button" className='add-transaction' onClick={addExpense}>
        + Add Expense
      </button>

      <div className='reset-table'>
        <button className='reset-transactions' onClick={() => exportFile('json')}>Export JSON</button>
        <button className='reset-transactions' onClick={() => exportFile('csv')}>Export CSV</button>
        <button className='reset-transactions' onClick={() => fileInputRef.current?.click()}>Import</button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <span>Reset to sample data: </span>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_SMALL)}> Small </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_MEDIUM)}> Medium </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_FULL)}> Full </button>
      </div>
    </div>
  )
}

export default TransactionList