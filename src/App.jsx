import './styles/App.css'
import Header from './components/Header'
import TransactionList from './components/TransactionList'
import Dashboard from './components/Dashboard'
import { BudgetProvider } from './context/BudgetContext'

function App() {
  return (
    <BudgetProvider>
      <Header />
      <main className="main-content">
      <Dashboard />
      <TransactionList />
      </main>
    </BudgetProvider>
  )
}

export default App