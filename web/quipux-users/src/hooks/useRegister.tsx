
import { register } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/toast"

export function useRegister() {

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => register(email, password),
        onSuccess: () => {
            toast.add({
                title: "Usuário criado com sucesso",
                description: "Você pode agora fazer login",
                type: "success"
            })
        },
        onError: (error) => {
            console.error(error)
        },
    })
}
