package me.soaresgus.usersapi.exception;

public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException() {
        super("Pessoa não encontrada");
    }

}
