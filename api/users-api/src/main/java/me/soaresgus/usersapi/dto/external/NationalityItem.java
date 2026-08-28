package me.soaresgus.usersapi.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;

public record NationalityItem(
        @JsonProperty("country_id") String countryId,
        double probability
) {
}
