package com.vlados.webshop.userservice.util.mapper;

import com.vlados.webshop.userservice.domain.SubscriptionType;
import com.vlados.webshop.userservice.domain.User;
import com.vlados.webshop.userservice.dto.user.NewUserDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDataDto;
import com.vlados.webshop.userservice.dto.user.ResponseUserDto;
import com.vlados.webshop.userservice.util.ResourceUtil;

import java.util.List;

public class UserMapper {
    private UserMapper() {
        throw new IllegalStateException(ResourceUtil.getMessage("code.state.illegal"));
    }

    public static User map(NewUserDto dto) {
        return new User(
                dto.email(),
                dto.password(),
                dto.name(),
                dto.phone(),
                null);
    }

    public static List<ResponseUserDto> map(List<User> list) {
        return list.stream()
                .map(UserMapper::map)
                .toList();
    }


    public static ResponseUserDto map(User user) {
        return new ResponseUserDto(
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getRole()
        );
    }

    public static ResponseUserDataDto mapData(List<Object> values) {
        Object[] _values = (Object[]) values.get(0);

        return new ResponseUserDataDto(
                _values[0].toString(),
                _values[1].toString(),
                null,
                safeGetString(_values, 3),
                safeGetString(_values, 7),
                _values[2].toString(),
                safeGetInt(_values, 6),
                safeGetInt(_values, 5),
                (SubscriptionType) _values[8],
                safeGetString(_values, 9)
        );
    }

    private static String safeGetString(Object[] values, int i) {
        Object temp = values[i];

        return temp != null ? temp.toString() : null;
    }

    private static int safeGetInt(Object[] values, int i) {
        Object temp = values[i];

        return temp != null ? (int) temp : 0;
    }
}
