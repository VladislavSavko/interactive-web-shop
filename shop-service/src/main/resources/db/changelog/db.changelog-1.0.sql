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
    relatedCategory bigint NOT NULL,
    inventory_id bigint NOT NULL,
    color varchar(255) NOT NULL,
    description varchar(255),
    inStockQuantity int NOT NULL,
    FOREIGN KEY (relatedCategory) REFERENCES items_categories(id),
    FOREIGN KEY (inventory_id) REFERENCES items_inventory(id)
    );

CREATE TABLE IF NOT EXISTS images(
                                     id serial NOT NULL PRIMARY KEY,
                                     binary_data blob NOT NULL,
                                     item_id bigint NOT NULL,
                                     FOREIGN KEY (item_id) REFERENCES items(id)
);
