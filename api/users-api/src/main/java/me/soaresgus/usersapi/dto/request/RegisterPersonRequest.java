package me.soaresgus.usersapi.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import me.soaresgus.usersapi.validation.ValidCpf;

public record RegisterPersonRequest(
        @NotBlank(message = "O CPF é obrigatório")
        @ValidCpf
        String cpf,

        @NotBlank(message = "O nome é obrigatório")
        String name,

        @NotBlank(message = "O sobrenome é obrigatório")
        String surname,

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "O e-mail deve ser válido")
        String email
) {
}
