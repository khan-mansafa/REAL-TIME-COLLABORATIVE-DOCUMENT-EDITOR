CREATE DATABASE realtime_docs;

\c realtime_docs;

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT DEFAULT ''
);
