package me.soaresgus.usersapi.client;

import me.soaresgus.usersapi.dto.external.NationalityItem;
import me.soaresgus.usersapi.dto.external.NationalizeApiResponse;
import me.soaresgus.usersapi.exception.ExternalServiceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Collections;
import java.util.List;

@Component
public class NationalizeClient {

    private final RestClient restClient;

    public NationalizeClient(@Qualifier("nationalizeRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    public List<NationalityItem> getNationalities(String name) {
        try {
            NationalizeApiResponse response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/")
                            .queryParam("name", name)
                            .build())
                    .retrieve()
                    .body(NationalizeApiResponse.class);

            if (response == null || response.country() == null) {
                return Collections.emptyList();
            }

            return response.country();
        } catch (RestClientException ex) {
            throw new ExternalServiceException();
        }
    }

}
