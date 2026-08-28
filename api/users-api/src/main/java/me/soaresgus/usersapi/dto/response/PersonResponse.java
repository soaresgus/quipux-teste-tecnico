package me.soaresgus.usersapi.dto.response;

import java.util.UUID;

public record PersonResponse(UUID id, String cpf, String name, String surname, String email) {
}
