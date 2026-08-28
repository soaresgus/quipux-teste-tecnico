package me.soaresgus.usersapi.exception;

public class CpfAlreadyExistsException extends RuntimeException {

    public CpfAlreadyExistsException() {
        super("CPF já cadastrado");
    }

}
