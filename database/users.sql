CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password TEXT,
    role VARCHAR(20)   -- admin / teacher
);
ALTER TABLE users
RENAME COLUMN password TO password_hash;

ALTER TABLE users
ADD COLUMN teacher_id INT;

ALTER TABLE users
ADD CONSTRAINT fk_users_teacher
FOREIGN KEY (teacher_id)
REFERENCES teachers2(teacher_id);