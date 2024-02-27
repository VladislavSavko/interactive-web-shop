package com.vlados.webshop.userservice.dto.exception;

import java.time.LocalDateTime;

public class ExceptionResponse {
    private final String message;
    private final LocalDateTime timestamp;

    public ExceptionResponse(String message, LocalDateTime timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

}
