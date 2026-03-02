import './styles/App.css'
import Header from './components/header'
import TransactionList from './components/TransactionList'
import Dashboard from './components/Dashboard'
import { BudgetProvider } from './context/BudgetContext'

function App() {
  return (
    <BudgetProvider>
      <Header />
      <Dashboard />
      <TransactionList />
    </BudgetProvider>
  )
}

export default App