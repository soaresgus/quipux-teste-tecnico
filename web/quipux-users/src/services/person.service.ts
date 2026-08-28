import { api } from "@/lib/api"
import type { Person } from "@/types/person"

export async function getPersons(authToken: string): Promise<Person[]> {
    const response = await api.get<Person[]>("/list", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return response.data
}

export async function getPersonByCpf(cpf: string, authToken: string): Promise<Person> {
    const response = await api.get<Person>(`/list/${cpf}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return response.data
}

interface GetPersonNationalitiesByCpfResponse {
  id: string
  name: string
  nationalities: Array<{
    country_id: string
    probability: number
  }>
}
export async function getPersonNationalitiesByCpf(cpf: string, authToken: string): Promise<GetPersonNationalitiesByCpfResponse> {
    const response = await api.get<GetPersonNationalitiesByCpfResponse>(`/findNacionalityByPerson/${cpf}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return response.data
}

export async function deletePersonByCpf(cpf: string, authToken: string): Promise<void> {
    await api.delete(`/list/${cpf}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}

export interface RegisterPersonRequest {
    cpf: string
    name: string
    surname: string
    email: string
}

export async function registerPerson(person: RegisterPersonRequest, authToken: string): Promise<Person> {
    const response = await api.post<Person>("/registrarName", person, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return response.data
}
