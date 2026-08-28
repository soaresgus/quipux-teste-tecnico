import { useAuth } from "@/context/AuthContext";
import { getPersonByCpf } from "@/services/person.service";
import { useQuery } from "@tanstack/react-query";

export function usePersonByCpf(cpf: string) {
    const { authToken } = useAuth()
    return useQuery({
        queryKey: ["person", cpf],
        queryFn: () => getPersonByCpf(cpf, authToken ?? ""),
        enabled: !!cpf && !!authToken,
        staleTime: 1000 * 60 * 5,
    })
}
