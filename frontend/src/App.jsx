import './App.css'
import ExpenseCard from './Components/ExpenseCard'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import HeroSection from './Components/HeroSection'

function App() {
  return (
    <>
    <HeroSection />
      <SignUpPage />
      <SignInPage />
      <ExpenseCard />
    </>
  )
}

export default App
