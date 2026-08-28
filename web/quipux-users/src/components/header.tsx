import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/button"

interface HeaderProps {
    showLogoutButton?: boolean
}

export function Header({ showLogoutButton }: HeaderProps) {
    const { logout } = useAuth()
    return (
        <header className="bg-white border-b py-2 px-4 flex justify-between items-center">
            <h1 className="text-2xl font-medium">Quipux Users - Teste Técnico</h1>
            {showLogoutButton && (
                <Button type="button" variant="default" onClick={logout}>
                    Desconectar
                </Button>
            )}
        </header>
    )
}
