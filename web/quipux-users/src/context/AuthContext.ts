import { createContext, useContext } from "react"

interface AuthContextType {
    authToken: string | null
    setAuthToken: (authToken: string | null) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    authToken: null,
    setAuthToken: () => { },
    logout: () => { },
})


export function useAuth() {
    return useContext(AuthContext)
}
