import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { formatCpf } from "@/lib/formatters/cpf";
import { searchBarSchema, type SearchBarSchema } from "@/schemas/searchBarSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface SearchBarProps {
    onSearch: (cpf: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<SearchBarSchema>(
        { resolver: zodResolver(searchBarSchema) }
    )

    const cpfRegister = register("cpf")

    const onSubmit = (data: SearchBarSchema) => {
        onSearch(data.cpf)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-4">
            <Field className="flex flex-col gap-2">
                <Label htmlFor="cpf" className="text-sm font-medium">Pesquisar por CPF</Label>
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
                    className="text-sm bg-white"
                />
                {errors.cpf && <p className="text-sm text-red-500">{errors.cpf.message}</p>}
            </Field>
            <Button type="submit" variant="outline" className="w-full">Pesquisar</Button>
        </form>
    )
}
