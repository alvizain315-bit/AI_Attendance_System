CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    division VARCHAR(10),
    parent_email VARCHAR(100),
    parent_contact VARCHAR(15)
);
