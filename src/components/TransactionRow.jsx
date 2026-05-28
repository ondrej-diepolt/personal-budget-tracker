import { useBudget } from '../context/BudgetContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories'

function AmountInput({ value, onChange }) {

  return (
    <span className="amount-cell">
      <input
        type="number"
        min="0"
        max="99999999"
        value={value === 0 ? '' : value}
        placeholder="0"
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          if (['e', 'E', '+', '.', '-'].includes(e.key)) e.preventDefault()
          if (e.key === 'Enter') e.target.blur()
        }}
        onChange={(e) => {
          const raw = e.target.value
          if (raw === '') { onChange(0); return }
          const parsed = parseInt(raw, 10)
          if (!isNaN(parsed) && parsed <= 99999999) onChange(parsed)
        }}
      />
      <span className="currency">Kč</span>
    </span>
  )
}

function NameInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      maxLength={15}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function TypeToggle({ value, onChange }) {
  return (
    <span
      className={value === 'Expense' ? 'type-expense' : 'type-income'}
      onClick={() => onChange(value === 'Expense' ? 'Income' : 'Expense')}
      style={{ cursor: 'pointer' }}
    >
      {value}
    </span>
  )
}

function CategoryToggle({ value, onChange, categories }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  )
}

function TransactionRow({ transaction, index }) {
  const { updateTransaction, removeTransaction } = useBudget()

  return (
    <tr style={{ animationDelay: `${index * 40}ms` }}>
      <td>
        <NameInput
          value={transaction.name}
          onChange={(v) => updateTransaction(transaction.id, { name: v })}
        />
      </td>
      <td>
        <CategoryToggle
          value={transaction.category}
          onChange={(v) => updateTransaction(transaction.id, { category: v })}
          categories={transaction.type === 'Expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
        />
      </td>
      <td>
        <AmountInput
          value={transaction.amount}
          onChange={(v) => updateTransaction(transaction.id, { amount: v })}
        />
      </td>
      <td>
        <button type="button" tabIndex={-1} onClick={() => removeTransaction(transaction.id)}>
          ✕
        </button>
      </td>
    </tr>
  )
}

export default TransactionRow