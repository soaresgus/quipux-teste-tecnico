import { Header } from "@/components/header"
import { useAuth } from "@/context/AuthContext"
import { LoginForm } from "@/components/login-form"
import { useState } from "react"
import { RegisterForm } from "@/components/register-form"
import { PersonList } from "@/components/person-list"
import { CreatePersonDialog } from "@/components/create-person-dialog"
import { SearchBar } from "@/components/search-bar"
import { SearchPersonDialog } from "@/components/search-person-dialog"

export function App() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [searchedCpf, setSearchedCpf] = useState<string | null>(null)
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

      <SearchBar onSearch={setSearchedCpf} />

      <SearchPersonDialog
        cpf={searchedCpf}
        open={searchedCpf !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSearchedCpf(null)
          }
        }}
      />

      <PersonList />

      <CreatePersonDialog />
    </main>
  )
}

export default App
