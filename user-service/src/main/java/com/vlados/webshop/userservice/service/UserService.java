package com.vlados.webshop.userservice.service;

import com.vlados.webshop.userservice.dto.auth.UserAuthDtoRequest;
import com.vlados.webshop.userservice.dto.auth.UserAuthDtoResponse;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserNameDto;
import com.vlados.webshop.userservice.dto.user.UpdatedUserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<ResponseUserDto> getAll();

    ResponseUserDto get(final long id);

    ResponseUserDto get(final String email);

    Optional<String> getEmailById(final long id);

    ResponseUserNameDto getNameAndEmail(final long id);

    List<ResponseUserDto> searchByEmail(final String email);

    List<ResponseUserDto> searchByName(final String name);

    ResponseUserDto add(final NewUserDto user);

    void delete(final String email);

    void update(final long id, final UpdatedUserDto dto);

    boolean exists(final long id);

    Optional<UserAuthDtoResponse> jwtTokenOf(final UserAuthDtoRequest request);
}
