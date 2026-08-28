import type { Person } from "@/types/person";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeletePersonByCpf } from "@/hooks/useDeletePersonByCpf";
import { formatCpf } from "@/lib/formatters/cpf";

interface PersonCardProps {
    person: Person
}

export function PersonCard({ person }: PersonCardProps) {
    const { mutateAsync: deletePersonByCpf, isPending } = useDeletePersonByCpf(person.cpf)

    const handleDeletePersonByCpf = async () => {
        await deletePersonByCpf()
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
