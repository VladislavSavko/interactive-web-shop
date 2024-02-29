package com.vlados.webshop.userservice.controller;

import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.exception.ExceptionResponse;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
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
    public List<ResponseUserDto> users(@RequestParam(name = "email", required = false) String email) {
        return email == null
                ?
                userService.getAll()
                :
                List.of(userService.get(email));
    }

    @GetMapping("/{id}")
    public ResponseUserDto user(@PathVariable(name = "id") long id) {
        return userService.get(id);
    }

    @PostMapping
    public ResponseUserDto newUser(@RequestBody @Valid NewUserDto newUserDto) {
        return userService.add(newUserDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") long id) {
        if (userService.exists(id)) {
            userService.delete(id);

            return ResponseEntity.ok()
                    .body(ResourceUtil.getMessage("response.user.deleted").formatted(id));
        } else {
            throw new NoSuchElementException(ResourceUtil.getMessage("db.user.id").formatted(id));
        }
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
