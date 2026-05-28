import { useEffect, useRef } from 'react'
import TransactionRow from './TransactionRow'
import { useBudget } from '../context/BudgetContext'
import { PRESET_FULL, PRESET_MEDIUM, PRESET_SMALL } from '../constants/transactionPresets'
import '../lib/FileDropzone'

function TransactionList() {
  const { transactions, addExpense, addIncome, resetToPreset, exportFile, importFile } = useBudget()
  const dropzoneRef = useRef(null)

  useEffect(() => {
    const el = dropzoneRef.current
    if (!el) return
    const handler = (e) => importFile(e.detail.file)
    el.addEventListener('file-selected', handler)
    return () => el.removeEventListener('file-selected', handler)
  }, [importFile])

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
        {rows.map((t, i) => <TransactionRow key={t.id} transaction={t} index={i} />)}
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

      <file-dropzone ref={dropzoneRef}></file-dropzone>

      <div className='reset-table'>
        <button className='reset-transactions' onClick={() => exportFile('json')}>Export JSON</button>
        <button className='reset-transactions' onClick={() => exportFile('csv')}>Export CSV</button>
        <span>Reset to sample data: </span>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_SMALL)}> Small </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_MEDIUM)}> Medium </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_FULL)}> Full </button>
      </div>
    </div>
  )
}

export default TransactionList