import { z } from "zod"

function onlyDigits(value: string) {
  return value.replace(/\D/g, "")
}

function checkDigit(digits: string, weightStart: number) {
  let sum = 0
  let weight = weightStart

  for (const char of digits) {
    sum += Number(char) * weight
    weight -= 1
  }

  const remainder = sum % 11
  return remainder < 2 ? 0 : 11 - remainder
}

export function isValidCpf(cpf: string) {
  const digits = onlyDigits(cpf)

  if (digits.length !== 11) {
    return false
  }

  if (/^(\d)\1{10}$/.test(digits)) {
    return false
  }

  const first = checkDigit(digits.slice(0, 9), 10)
  if (first !== Number(digits[9])) {
    return false
  }

  const second = checkDigit(digits.slice(0, 10), 11)
  return second === Number(digits[10])
}

export const createPersonSchema = z.object({
  cpf: z
    .string({ required_error: "O CPF é obrigatório" })
    .trim()
    .min(1, "O CPF é obrigatório")
    .refine(isValidCpf, "O CPF deve ser válido")
    .transform(onlyDigits),
  name: z.string({ required_error: "O nome é obrigatório" }).trim().min(1, "O nome é obrigatório"),
  surname: z.string({ required_error: "O sobrenome é obrigatório" }).trim().min(1, "O sobrenome é obrigatório"),
  email: z.string({ required_error: "O email é obrigatório" }).trim().min(1, "O email é obrigatório").email("O email deve ser válido"),
})

export type CreatePersonSchema = z.infer<typeof createPersonSchema>
