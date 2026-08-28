import { useAuth } from "@/context/AuthContext";
import { getPersonByCpf } from "@/services/person.service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePersonByCpf(cpf: string) {
    const { authToken } = useAuth()
    return useQuery({
        queryKey: ["person", cpf],
        queryFn: () => getPersonByCpf(cpf, authToken ?? ""),
        enabled: !!cpf && !!authToken,
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return false
            }

            return failureCount < 2
        },
    })
}
