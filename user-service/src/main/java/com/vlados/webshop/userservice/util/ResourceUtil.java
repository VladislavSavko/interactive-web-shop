package com.vlados.webshop.userservice.util;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ResourceUtil {
    private static Environment messages;

    @Autowired
    private Environment autowiredEnvironment;

    @PostConstruct
    private void init() {
        messages = autowiredEnvironment;
    }


    public static String getMessage(final String key) {
        return messages.getProperty(key);
    }
}
