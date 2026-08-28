import { PersonCard } from "@/components/person-card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { usePersonByCpf } from "@/hooks/usePersonByCpf"
import { formatCpf } from "@/lib/formatters/cpf"
import { AlertCircle, Loader2 } from "lucide-react"

interface SearchPersonDialogProps {
    cpf: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SearchPersonDialog({ cpf, open, onOpenChange }: SearchPersonDialogProps) {
    const { data: person, isLoading } = usePersonByCpf(cpf ?? "")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Resultado da busca</DialogTitle>
                    <DialogDescription>
                        {cpf ? `CPF ${formatCpf(cpf)}` : "Busca por CPF"}
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center gap-2 py-6">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Buscando pessoa...</span>
                    </div>
                ) : person ? (
                    <PersonCard person={person} onDeleted={() => onOpenChange(false)} />
                ) : (
                    <div className="flex items-center justify-center gap-2 py-6 text-center">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Nenhuma pessoa encontrada com este CPF.</span>
                    </div>
                )}

                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Fechar</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
