-- liquibase formatted sql
-- changeset vlados:1

CREATE TABLE IF NOT EXISTS items_inventory(
                                              id bigint NOT NULL PRIMARY KEY,
                                              quantity bigint NOT NULL,
                                              created_at datetime NOT NULL,
                                              updated_at datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS items_categories(
                                               id bigint NOT NULL PRIMARY KEY,
                                               name varchar(255) NOT NULL,
    description varchar(255)
    );


CREATE TABLE IF NOT EXISTS items(
                                    id bigint NOT NULL PRIMARY KEY,
                                    name varchar(255) NOT NULL,
    category bigint NOT NULL,
    inventory_id bigint NOT NULL,
    color varchar(255) NOT NULL,
    description varchar(255),
    price bigint NOT NULL,
    FOREIGN KEY (category) REFERENCES items_categories(id),
    FOREIGN KEY (inventory_id) REFERENCES items_inventory(id)
    );

CREATE TABLE IF NOT EXISTS images(
                                     id serial NOT NULL PRIMARY KEY,
                                     binary_data blob NOT NULL,
                                     item_id bigint NOT NULL,
                                     FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE IF NOT EXISTS carts(
                                    id bigint NOT NULL PRIMARY KEY,
                                    user_id bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items(
                                    id serial NOT NULL PRIMARY KEY,
                                    item_id bigint NOT NULL,
                                    cart_id bigint NOT NULL,
                                    quantity int NOT NULL,
                                    size tinyint NOT NULL

);

CREATE TABLE IF NOT EXISTS orders(
                                    id bigint NOT NULL PRIMARY KEY,
                                    user_id bigint NOT NULL,
                                    created_at date NOT NULL,
                                    updated_at date NOT NULL,
                                    total double NOT NULL,
                                    status tinyint NOT NULL
);

CREATE TABLE IF NOT EXISTS orders_items(
                                         id serial NOT NULL PRIMARY KEY,
                                         order_id bigint NOT NULL,
                                         item_id bigint NOT NULL,
                                         item_size tinyint NOT NULL,
                                         quantity int NOT NULL,
                                         created_at date NOT NULL,
                                         updated_at date NOT NULL
);
