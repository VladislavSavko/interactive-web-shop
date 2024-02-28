package com.vlados.webshop.userservice.controller.advice;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class NoSuchEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ex.getBody().setProperty("errors",
                ex.getAllErrors().stream()
                        .collect(Collectors.toMap(this::getKey, this::resolveMessage))
        );

        return super.handleExceptionInternal(ex, null, headers, status, request);
    }

    private String getKey(ObjectError objectError) {
        return (objectError instanceof FieldError fe) ? fe.getCode() : objectError.getObjectName();
    }

    private String resolveMessage(ObjectError objectError) {
        return getMessageSource() != null
                ?
                getMessageSource().getMessage(objectError, LocaleContextHolder.getLocale())
                :
                objectError.getDefaultMessage();
    }
}
