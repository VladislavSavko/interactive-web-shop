package com.vlados.webshop.userservice.domain;

public enum SubscriptionType {
    NONE("NONE"),
    ONE_MONTH("LIGHT"),
    THREE_MONTHS("MEDIUM"),
    FIVE_MONTHS("SUPER");

    SubscriptionType(String type) {
        typeName = type;
    }

    private final String typeName;

    public String getTypeName() {
        return typeName;
    }

    public static SubscriptionType fromString(String type) {
        SubscriptionType result = null;
        for (SubscriptionType t : SubscriptionType.values()) {
            if (t.typeName.equals(type)) {
                result = t;
            }
        }

        return result;
    }

    public static SubscriptionType fromOrdinal(int num) {
        SubscriptionType result = null;
        for (SubscriptionType t : SubscriptionType.values()) {
            if (t.ordinal() == num) {
                result = t;
            }
        }

        return result;
    }
}
