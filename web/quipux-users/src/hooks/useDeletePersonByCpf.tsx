import { toast } from "@/components/ui/toast"
import { useAuth } from "@/context/AuthContext"
import { deletePersonByCpf } from "@/services/person.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeletePersonByCpf(cpf: string) {
    const { authToken } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deletePersonByCpf(cpf, authToken ?? ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["person", cpf] })
            queryClient.invalidateQueries({ queryKey: ["persons"] })
            queryClient.invalidateQueries({ queryKey: ["personNationalities", cpf] })
            toast.add({
                title: "Pessoa deletada com sucesso",
                description: "A pessoa foi deletada com sucesso",
                type: "success"
            })
        },
        onError: () => {
            toast.add({
                title: "Erro ao deletar pessoa",
                description: "Ocorreu um erro ao deletar a pessoa",
                type: "error"
            })
        },
    })
}
