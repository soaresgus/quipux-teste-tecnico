import { useState } from "react"
import { AuthContext } from "@/context/AuthContext"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("authToken") || null)

    const handleSetAuthToken = (token: string | null) => {
        setAuthToken(token)
        if (token) {
            localStorage.setItem("authToken", token)
        } else {
            localStorage.removeItem("authToken")
        }
    }

    const handleLogout = () => {
        setAuthToken(null)
        localStorage.removeItem("authToken")
    }

    return (
        <AuthContext.Provider value={{
            authToken,
            setAuthToken: handleSetAuthToken,
            logout: handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
