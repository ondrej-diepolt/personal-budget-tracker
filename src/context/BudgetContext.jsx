// BudgetContext — single source of truth for the whole application.
// Composes two custom hooks (useMonth for time navigation, useTransactions for data + persistence)
// and exposes their combined state and actions to any descendant component via the useBudget() hook.
import { createContext, useContext } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useMonth } from '../hooks/useMonth'

const BudgetContext = createContext(null)

// Provider component — instantiates the hooks once and passes their values down through Context.
// Must wrap any part of the app that uses useBudget().
export function BudgetProvider({ children }) {
  // Current month state and navigation (prev / next / formatted label).
  const { currentMonth, prevMonth, nextMonth, formatLabel } = useMonth()
  // Transactions for that month plus all mutation and import/export actions.
  // The hook re-loads transactions from LocalStorage whenever currentMonth changes.
  const { transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction, exportFile, importFile } = useTransactions(currentMonth)

  return (
    <BudgetContext.Provider value={{ 
      currentMonth, prevMonth, nextMonth, formatLabel,
      transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction, exportFile, importFile}}>
      {children}
    </BudgetContext.Provider>
  )
}

// Convenience consumer hook — components call useBudget() instead of useContext(BudgetContext).
export function useBudget() {
  return useContext(BudgetContext)
}