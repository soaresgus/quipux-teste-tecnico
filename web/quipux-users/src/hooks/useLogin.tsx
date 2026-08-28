import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "@/services/auth.service"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/toast"

export function useLogin() {
    const { setAuthToken } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => login(email, password),
        onSuccess: (data) => {
            setAuthToken(data.authToken)
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.add({
                title: "Login realizado com sucesso",
                description: "Você está logado agora",
                type: "success"
            })
        },
        onError: () => {
            toast.add({
                title: "Erro ao fazer login",
                description: "Verifique suas credenciais e tente novamente",
                type: "error"
            })
        },
    })

}
