package com.vlados.webshop.userservice.controller.advice;

import com.vlados.webshop.userservice.dto.exception.ExceptionResponse;
import com.vlados.webshop.userservice.exception.DuplicateEmailException;
import com.vlados.webshop.userservice.exception.NoSuchEntityException;
import com.vlados.webshop.userservice.exception.WrongCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class UserExceptionHandler {
    @ExceptionHandler(NoSuchEntityException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchEntityException(NoSuchEntityException nsee) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(nsee.getMessage(), LocalDateTime.now()));
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleWrongCredentialsException(WrongCredentialsException wce) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(wce.getMessage(), LocalDateTime.now()));
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ExceptionResponse> handleDuplicateEmailException(DuplicateEmailException dee) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(dee.getMessage(), LocalDateTime.now()));
    }
}
