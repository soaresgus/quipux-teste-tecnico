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
import { useLogin } from "@/hooks/useLogin"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface LoginFormProps {
    onRegister: () => void
}

export function LoginForm({ onRegister }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { mutateAsync: login, isPending } = useLogin()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login({ email, password })
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <Card>
                <CardHeader>
                    <CardTitle>Entre em sua conta</CardTitle>
                    <CardDescription>
                        Digite seu email e senha abaixo para entrar em sua conta
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
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={onRegister} disabled={isPending}>
                        Cadastre-se
                    </Button>
                </CardFooter>
            </Card>
        </form>

    )
}
