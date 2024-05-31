package com.vlados.webshop.userservice.controller;

import com.vlados.webshop.userservice.dto.auth.UserAuthDtoRequest;
import com.vlados.webshop.userservice.dto.auth.UserAuthDtoResponse;
import com.vlados.webshop.userservice.dto.exception.ExceptionResponse;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserNameDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;
import com.vlados.webshop.userservice.service.UserService;
import com.vlados.webshop.userservice.util.ResourceUtil;
import jakarta.validation.Valid;
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
    public List<ResponseUserDto> users() {
        return userService.getAll();
    }

    @GetMapping("/auth/{email}")
    public ResponseUserDto user(@PathVariable(name = "email") String email) {
        return userService.get(email);
    }

    @GetMapping("/{id}")
    public ResponseUserDto user(@PathVariable(name = "id") long id) {
        return userService.get(id);
    }

    @GetMapping("/{id}/data")
    public ResponseUserNameDto usernameAndEmail(@PathVariable(name = "id") long id) {
        return userService.getNameAndEmail(id);
    }

    @PostMapping
    public ResponseUserDto newUser(@RequestBody @Valid NewUserDto newUserDto) {
        return userService.add(newUserDto);
    }

    @PostMapping("/auth")
    public ResponseEntity<UserAuthDtoResponse> authenticateUser(@RequestBody UserAuthDtoRequest dto) {
        return ResponseEntity.of(userService.jwtTokenOf(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") long id) {

        userService.delete(id);

        return ResponseEntity.ok()
                .body(ResourceUtil.getMessage("response.user.deleted").formatted(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable(name = "id") long id,
                                             @RequestBody @Valid UpdatedUserDto user) {
        userService.update(id, user);

        return ResponseEntity
                .ok()
                .body(ResourceUtil.getMessage("response.user.updated").formatted(user.email()));
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchEmailException(NoSuchElementException nsue) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ExceptionResponse(nsue.getMessage(), LocalDateTime.now()));
    }
}
