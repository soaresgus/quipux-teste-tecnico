import { api } from "@/lib/api"

interface LoginResponse {
    authToken: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", { email, password })
    return response.data
}

interface RegisterResponse {
    id: string
    email: string
}

export async function register(email: string, password: string): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/register", { email, password })
    return response.data
}
