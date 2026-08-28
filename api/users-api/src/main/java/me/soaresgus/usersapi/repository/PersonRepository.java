package me.soaresgus.usersapi.repository;

import me.soaresgus.usersapi.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {

    boolean existsByCpf(String cpf);

}
