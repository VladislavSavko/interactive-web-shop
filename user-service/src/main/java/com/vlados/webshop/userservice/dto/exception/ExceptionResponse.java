package com.vlados.webshop.userservice.dto.exception;

import java.time.LocalDateTime;


public record ExceptionResponse(String message, LocalDateTime timestamp) {
}
