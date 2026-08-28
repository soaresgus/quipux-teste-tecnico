package me.soaresgus.usersapi.dto.response;

import java.util.List;

public record ApiErrorResponse(
        int status,
        String message,
        List<FieldError> errors
) {

    public record FieldError(String field, String message) {
    }

    public static ApiErrorResponse of(int status, String message) {
        return new ApiErrorResponse(status, message, List.of());
    }

    public static ApiErrorResponse of(int status, String message, List<FieldError> errors) {
        return new ApiErrorResponse(status, message, errors);
    }

}
