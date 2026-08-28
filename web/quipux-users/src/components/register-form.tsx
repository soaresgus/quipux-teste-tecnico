import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hooks/useRegister"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface RegisterFormProps {
    onBackToLogin: () => void
}

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { mutateAsync: register, isPending } = useRegister()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        await register({ email, password })
        setEmail("")
        setPassword("")
        onBackToLogin()
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <Card>
                <CardHeader>
                    <CardTitle>Cadastre-se</CardTitle>
                    <CardDescription>
                        Digite seu email e senha abaixo para cadastrar-se
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="exemplo@email.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={onBackToLogin} disabled={isPending}>
                        Voltar para o login
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
