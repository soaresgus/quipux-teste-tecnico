import type { Person } from "@/types/person";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeletePersonByCpf } from "@/hooks/useDeletePersonByCpf";
import { formatCpf } from "@/lib/formatters/cpf";
import { usePersonNationalitiesByCpf } from "@/hooks/usePersonNationalitiesByCpf";
import countryNames from "@/constants/country-names.json";

interface PersonCardProps {
    person: Person
    onDeleted?: () => void
}

export function PersonCard({ person, onDeleted }: PersonCardProps) {
    const { mutateAsync: deletePersonByCpf, isPending } = useDeletePersonByCpf(person.cpf)
    const { data: nationalities, isLoading: isNationalitiesLoading } = usePersonNationalitiesByCpf(person.cpf)

    const handleDeletePersonByCpf = async () => {
        await deletePersonByCpf()
        onDeleted?.()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold">{person.name} {person.surname}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-zinc-800 flex items-center gap-2">
                    <span className="font-bold">CPF:</span>
                    <span>{formatCpf(person.cpf)}</span>
                </div>
                <div className="text-sm text-zinc-800 flex items-center gap-2">
                    <span className="font-bold">Email:</span>
                    <span>{person.email}</span>
                </div>
                <div className="text-sm text-zinc-800 flex items-center gap-2">
                    <span className="font-bold">Nacionalidade (Previsão):</span>
                    {isNationalitiesLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <span>
                            {
                                nationalities?.nationalities[0].country_id ?
                                    `${countryNames[nationalities?.nationalities[0].country_id as keyof typeof countryNames]} (${nationalities?.nationalities[0].country_id})`
                                    : "Nacionalidade não encontrada"
                            }
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" onClick={handleDeletePersonByCpf} disabled={isPending}>
                    <TrashIcon className="w-4 h-4" />
                    <span>{isPending ? "Deletando..." : "Deletar"}</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
