package com.vlados.webshop.userservice.controller;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.exception.ExceptionResponse;
import com.vlados.webshop.userservice.service.UserService;
import com.vlados.webshop.userservice.util.ResourceUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> users(@RequestParam(name = "email", required = false) String email) {
        return email == null
                ?
                userService.getAll()
                :
                List.of(userService.get(email)
                        .orElseThrow(() -> new NoSuchElementException(
                                ResourceUtil.getMessage("db.user.email")
                                        .formatted(email))
                        ));
    }


    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchEmailException(NoSuchElementException nsue) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(nsue.getMessage(), LocalDateTime.now()));
    }
//    TODO: Write script for db filling and test REST API and exceptions
}
