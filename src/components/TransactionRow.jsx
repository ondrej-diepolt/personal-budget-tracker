import { useRef } from 'react'
import { useBudget } from '../context/BudgetContext'

function AmountInput({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <span className="amount-cell">
      <input
        ref={inputRef}
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
      onClick={() => onChange(value === 'výdaj' ? 'příjem' : 'výdaj')}
      style={{ cursor: 'pointer' }}
    >
      {value}
    </span>
  )
}

function TransactionRow({ transaction }) {
  const { updateTransaction, removeTransaction } = useBudget()

  return (
    <tr>
      <td>
        <TypeToggle
          value={transaction.type}
          onChange={(v) => updateTransaction(transaction.id, { type: v })}
        />
      </td>
      <td>
        <NameInput
          value={transaction.name}
          onChange={(v) => updateTransaction(transaction.id, { name: v })}
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