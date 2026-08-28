package me.soaresgus.usersapi.dto.external;

import java.util.List;

public record NationalizeApiResponse(
        String name,
        Integer count,
        List<NationalityItem> country
) {
}
