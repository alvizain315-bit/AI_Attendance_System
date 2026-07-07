CREATE TABLE student_photo(
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    photo_path VARCHAR(255)
);