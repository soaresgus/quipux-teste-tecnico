import { toast } from "@/components/ui/toast"
import { useAuth } from "@/context/AuthContext"
import { registerPerson, type RegisterPersonRequest } from "@/services/person.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useRegisterPerson() {
    const { authToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (person: RegisterPersonRequest) => registerPerson(person, authToken ?? ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["persons"] })
            toast.add({
                title: "Pessoa registrada com sucesso",
                description: "A pessoa foi registrada com sucesso",
                type: "success"
            })
        },
        onError: () => {
            toast.add({
                title: "Erro ao registrar pessoa",
                description: "Ocorreu um erro ao registrar a pessoa",
                type: "error"
            })
        },
    })
}
