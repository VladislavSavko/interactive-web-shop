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
    ('admin@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1, 'admin'),
    ('superadmin@superadmin.com', '186cf774c97b60a1c106ef718d10970a6a06e06bef89553d9ae65d938a886eae', 2, 'superadmin');
