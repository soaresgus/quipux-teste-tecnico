package me.soaresgus.usersapi.controller;

import jakarta.validation.Valid;
import me.soaresgus.usersapi.dto.request.RegisterPersonRequest;
import me.soaresgus.usersapi.dto.response.PersonResponse;
import me.soaresgus.usersapi.service.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/registrarName")
    public ResponseEntity<PersonResponse> registrarName(@Valid @RequestBody RegisterPersonRequest request) {
        PersonResponse response = personService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
