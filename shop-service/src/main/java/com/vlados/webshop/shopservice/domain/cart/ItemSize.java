package com.vlados.webshop.shopservice.domain.cart;

public enum ItemSize {
    S("S"),
    M("M"),
    L("L"),
    XL("XL");
    private final String value;

    ItemSize(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
