-- liquibase formatted sql
-- changeset vlados:1

CREATE TABLE IF NOT EXISTS _users(
                                     id serial NOT NULL PRIMARY KEY,
                                     email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phone varchar(15) NOT NULL,
    role tinyint NOT NULL,
    name varchar(255) NOT NULL,
    subscription tinyint NOT NULL,
    subscription_category varchar(255)
    );

-- changeset vlados:2

INSERT INTO _users (email, password, phone, role, name, subscription, subscription_category)
VALUES
    ('admin@admin.com', '$2a$10$L9pqrWnlCaDXTKUgJFilZOJZCj7r6tWK1OeQTyhCBL2a1THfcxv5O', '+375447325979', 1, 'admin', 0, null)
