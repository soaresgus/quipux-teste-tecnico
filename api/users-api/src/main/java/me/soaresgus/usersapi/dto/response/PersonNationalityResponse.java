package me.soaresgus.usersapi.dto.response;

import me.soaresgus.usersapi.dto.external.NationalityItem;

import java.util.List;
import java.util.UUID;

public record PersonNationalityResponse(
        UUID id,
        String name,
        List<NationalityItem> nationalities
) {
}
