import { useAuth } from "@/context/AuthContext";
import { getPersonNationalitiesByCpf } from "@/services/person.service";
import { useQuery } from "@tanstack/react-query";

export function usePersonNationalitiesByCpf(cpf: string) {
    const { authToken } = useAuth()
    return useQuery({
        queryKey: ["personNationalities", cpf],
        queryFn: () => getPersonNationalitiesByCpf(cpf, authToken ?? ""),
        enabled: !!cpf && !!authToken,
        staleTime: 1000 * 60 * 5,
    })
}
