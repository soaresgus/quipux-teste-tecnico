import { usePersons } from "@/hooks/usePersons";
import { PersonCard } from "./person-card";
import { AlertCircle, Loader2 } from "lucide-react";

export function PersonList() {
    const { data: persons, isLoading, isError } = usePersons()

    if (isLoading) return <div className="flex items-center gap-2 justify-center flex-1"><Loader2 className="w-4 h-4 animate-spin" /> <span className="text-lg">Carregando...</span></div>
    if (isError) return <div className="flex items-center gap-2 justify-center flex-1"><AlertCircle className="w-4 h-4" /> <span className="text-lg">Erro ao carregar pessoas</span></div>
    if (!persons || persons.length === 0) return <div className="flex items-center gap-2 justify-center flex-1"><AlertCircle className="w-4 h-4" /> <span className="text-lg">Nenhuma pessoa encontrada</span></div>

    return (
        <section className="flex flex-wrap gap-4 p-4">
            {persons.map((person) => (
                <PersonCard key={person.cpf} person={person} />
            ))}
        </section>
    )
}
