import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPersonSchema, type CreatePersonSchema } from "@/schemas/createPersonSchema"
import { Loader2, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterPerson } from "@/hooks/useRegisterPerson"
import { useState } from "react"
import { formatCpf } from "@/lib/formatters/cpf"

export function CreatePersonDialog() {
    const [isOpen, setIsOpen] = useState(false)

    const { mutateAsync: createPerson, isPending } = useRegisterPerson()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreatePersonSchema>({
        resolver: zodResolver(createPersonSchema),
        defaultValues: {
            cpf: "",
            name: "",
            surname: "",
            email: "",
        },
    })

    const cpfRegister = register("cpf")

    const onSubmit = handleSubmit(async (data) => {
        await createPerson(data)
        reset()
        setIsOpen(false)
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                render={
                    <Button type="button" variant="default" className="absolute bottom-4 right-4 flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        <span>Adicionar pessoa</span>
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Adicionar pessoa</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para adicionar uma nova pessoa.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="surname">Sobrenome</Label>
                            <Input id="surname" {...register("surname")} />
                            {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register("email")} placeholder="exemplo@email.com" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </Field>
                        <Field>
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                inputMode="numeric"
                                autoComplete="off"
                                placeholder="000.000.000-00"
                                maxLength={14}
                                {...cpfRegister}
                                onChange={(event) => {
                                    event.target.value = formatCpf(event.target.value)
                                    cpfRegister.onChange(event)
                                }}
                            />
                            {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancelar</Button>} />
                        <Button type="submit" disabled={isPending}>{isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Adicionar"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
