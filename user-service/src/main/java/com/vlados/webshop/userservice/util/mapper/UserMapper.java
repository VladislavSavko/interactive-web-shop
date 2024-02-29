package com.vlados.webshop.userservice.util.mapper;

import com.vlados.webshop.userservice.domain.Address;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.address.AddressDto;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
import com.vlados.webshop.userservice.util.ResourceUtil;

import java.util.List;

public class UserMapper {
    private UserMapper() {
        throw new IllegalStateException(ResourceUtil.getMessage("code.state.illegal"));
    }

    public static User map(NewUserDto dto) {
        AddressDto addressDto = dto.address();
        User user = new User(
                dto.email(),
                dto.password(),
                dto.name(),
                null);
        user.setAddress(
                new Address(
                        addressDto.countryCode(),
                        addressDto.city(),
                        addressDto.street(),
                        addressDto.houseNumber(),
                        addressDto.flatNumber(),
                        user)
        );
        return user;
    }

    public static List<ResponseUserDto> map(List<User> list) {
        return list.stream()
                .map(UserMapper::map)
                .toList();
    }


    public static ResponseUserDto map(User user) {
        Address address = user.getAddress();
        return address == null
                ?
                new ResponseUserDto(user.getEmail(), user.getName(), null)
                :
                new ResponseUserDto(user.getEmail(), user.getName(), AddressMapper.map(address));
    }
}
