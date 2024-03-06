package com.vlados.webshop.gatewayservice.util;

import java.util.ResourceBundle;


public class ResourceUtil {
    private final static String MESSAGES_PROPS = "messages";


    public static String getMessage(final String key) {
        return ResourceBundle.getBundle(MESSAGES_PROPS).getString(key);
    }
}
