package me.soaresgus.usersapi.service;

import me.soaresgus.usersapi.dto.request.RegisterPersonRequest;
import me.soaresgus.usersapi.dto.response.PersonResponse;
import me.soaresgus.usersapi.entity.Person;
import me.soaresgus.usersapi.exception.CpfAlreadyExistsException;
import me.soaresgus.usersapi.repository.PersonRepository;
import me.soaresgus.usersapi.validation.CpfUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Transactional
    public PersonResponse register(RegisterPersonRequest request) {
        String cpf = CpfUtils.normalize(request.cpf());

        if (personRepository.existsByCpf(cpf)) {
            throw new CpfAlreadyExistsException();
        }

        Person person = new Person(cpf, request.name(), request.surname(), request.email());
        Person savedPerson = personRepository.save(person);

        return toResponse(savedPerson);
    }

    @Transactional(readOnly = true)
    public List<PersonResponse> listAll() {
        return personRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private PersonResponse toResponse(Person person) {
        return new PersonResponse(
                person.getId(),
                person.getCpf(),
                person.getName(),
                person.getSurname(),
                person.getEmail()
        );
    }

}
