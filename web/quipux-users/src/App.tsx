import { Header } from "@/components/header"
import { useAuth } from "./context/AuthContext"
import { LoginForm } from "./components/login-form"
import { useState } from "react"
import { RegisterForm } from "./components/register-form"

export function App() {
  const [isRegistering, setIsRegistering] = useState(false)
  const { authToken } = useAuth()

  if (!authToken) {
    return (
      <main className="min-h-svh flex flex-col bg-zinc-200">
        <Header />

        <div className="flex flex-col items-center justify-center flex-1">
          {isRegistering ? <RegisterForm onBackToLogin={() => setIsRegistering(false)} /> : <LoginForm onRegister={() => setIsRegistering(true)} />}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-svh flex flex-col bg-zinc-200">
      <Header showLogoutButton />
    </main>
  )
}

export default App
