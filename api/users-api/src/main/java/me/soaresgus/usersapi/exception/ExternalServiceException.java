package me.soaresgus.usersapi.exception;

public class ExternalServiceException extends RuntimeException {

    public ExternalServiceException() {
        super("Erro ao consultar serviço externo");
    }

}
