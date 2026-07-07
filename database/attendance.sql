CREATE TABLE attendance1 (
    attendance_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL REFERENCES students(student_id),

    timetable_id INT NOT NULL REFERENCES timetable1(timetable_id),

    attendance_date DATE NOT NULL,

    in_time TIME,

    out_time TIME,

    status VARCHAR(20),

    confidence_score DECIMAL(5,2)
);

ALTER TABLE attendance1
ADD COLUMN subject_snapshot VARCHAR(100),
ADD COLUMN teacher_id_snapshot INT;

ALTER TABLE attendance1
ADD CONSTRAINT unique_attendance
UNIQUE(student_id, timetable_id, attendance_date);