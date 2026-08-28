import { useAuth } from "@/context/AuthContext";
import { getPersons } from "@/services/person.service";
import { useQuery } from "@tanstack/react-query";

export function usePersons() {
    const { authToken } = useAuth()
    return useQuery({
        queryKey: ["persons"],
        queryFn: () => getPersons(authToken ?? ""),
        enabled: !!authToken,
        staleTime: 1000 * 60 * 5,
    })
}
