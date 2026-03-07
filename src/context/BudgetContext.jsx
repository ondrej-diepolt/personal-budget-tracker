// BudgetContext.jsx
import { createContext, useContext } from 'react'
import { useTransactions } from '../hooks/useTransactions'

const BudgetContext = createContext(null)

export function BudgetProvider({ children }) {
  const { transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction } = useTransactions()

  return (
    <BudgetContext.Provider value={{ transactions, resetToPreset, updateTransaction, addExpense, addIncome, removeTransaction }}>
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  return useContext(BudgetContext)
}