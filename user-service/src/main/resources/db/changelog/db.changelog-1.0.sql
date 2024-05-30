-- liquibase formatted sql
-- changeset vlados:1

CREATE TABLE IF NOT EXISTS _users(
                                     id serial NOT NULL PRIMARY KEY,
                                     email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role tinyint NOT NULL,
    name varchar(255) NOT NULL
    );

-- changeset vlados:2

INSERT INTO _users (email, password, role, name)
VALUES
    ('admin@admin.com', '$2a$10$L9pqrWnlCaDXTKUgJFilZOJZCj7r6tWK1OeQTyhCBL2a1THfcxv5O', 1, 'admin')
