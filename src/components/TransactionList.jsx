// TransactionList — main editable view.
// Renders the Income and Expenses tables (inline editing), data action buttons
// (Export JSON / Export CSV, Reset to preset), and the <file-dropzone> web component
// that handles drag & drop / click-to-browse import of JSON or CSV files.
import { useEffect, useRef } from 'react'
import TransactionRow from './TransactionRow'
import { useBudget } from '../context/BudgetContext'
import { PRESET_FULL, PRESET_MEDIUM, PRESET_SMALL } from '../constants/transactionPresets'
// Side-effect import — running this module registers the <file-dropzone> custom element.
import '../lib/FileDropzone'

function TransactionList() {
  const { transactions, addExpense, addIncome, resetToPreset, exportFile, importFile } = useBudget()
  const dropzoneRef = useRef(null)

  // Bridge between the <file-dropzone> web component and React.
  // The component emits a 'file-selected' CustomEvent on drop or file pick;
  // we listen for it on the element ref and forward the file to importFile().
  useEffect(() => {
    const el = dropzoneRef.current
    if (!el) return
    const handler = (e) => importFile(e.detail.file)
    el.addEventListener('file-selected', handler)
    return () => el.removeEventListener('file-selected', handler)
  }, [importFile])

  // Split transactions into two groups so they can be rendered as separate tables.
  const income = transactions.filter(t => t.type === 'Income')
  const expenses = transactions.filter(t => t.type === 'Expense')

  // Helper — renders a table with one TransactionRow per row.
  // The index is passed down so each row can stagger its entrance animation.
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
    <section className='transaction-list'>
      <div className='transaction-list-header'>
        <h2>Transactions</h2>
        <span className='transaction-list-meta'>
          {transactions.length} records
        </span>
      </div>

      <h3 className='section-label'>Income</h3>
      {renderTable(income, 'Income')}
      <button type="button" className='add-transaction' onClick={addIncome}>
        + Add Income
      </button>

      <h3 className='section-label'>Expenses</h3>
      {renderTable(expenses, 'Expense')}
      <button type="button" className='add-transaction' onClick={addExpense}>
        + Add Expense
      </button>

      {/* Custom HTML element — handles drag & drop and click-to-browse for file import. */}
      <file-dropzone ref={dropzoneRef}></file-dropzone>

      <div className='reset-table'>
        <button className='reset-transactions' onClick={() => exportFile('json')}>Export JSON</button>
        <button className='reset-transactions' onClick={() => exportFile('csv')}>Export CSV</button>
        <span>Reset to sample data: </span>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_SMALL)}> Small </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_MEDIUM)}> Medium </button>
        <button className='reset-transactions' onClick={() => resetToPreset(PRESET_FULL)}> Full </button>
      </div>
    </section>
  )
}

export default TransactionList