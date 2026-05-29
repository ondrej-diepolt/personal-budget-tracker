// TransactionRow — renders one editable row of the transactions table.
// Splits each cell into its own small input component (AmountInput, NameInput, etc.)
// so each one can handle its own validation, formatting and keyboard behavior in isolation.
import { useBudget } from '../context/BudgetContext'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories'

// Numeric input for the transaction amount.
// Strips non-numeric keys, caps the value at 99 999 999, and shows empty when value is 0.
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
          // Block scientific notation and signs — we only allow whole non-negative numbers.
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

// Plain text input for the transaction name, capped at 15 characters.
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

// Clickable label that toggles a transaction between Income and Expense.
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

// Dropdown selector for the transaction category.
// Receives the list of categories from the parent so it can show either income or expense options.
function CategoryToggle({ value, onChange, categories }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  )
}

// Main row component.
// `index` is used to stagger the row entrance animation (animationDelay).
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