package me.soaresgus.usersapi.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException() {
        super("E-mail já cadastrado");
    }

}
