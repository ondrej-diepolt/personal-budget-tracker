// BudgetContext.jsx
import { createContext, useContext } from 'react'
import { useTransactions } from '../hooks/useTransactions'
import { useMonth } from '../hooks/useMonth'

const BudgetContext = createContext(null)

export function BudgetProvider({ children }) {
  const { currentMonth, prevMonth, nextMonth, formatLabel } = useMonth()
  const { transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction, exportFile } = useTransactions()

  return (
    <BudgetContext.Provider value={{ 
      currentMonth, prevMonth, nextMonth, formatLabel,
      transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction, exportFile }}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  return useContext(BudgetContext)
}