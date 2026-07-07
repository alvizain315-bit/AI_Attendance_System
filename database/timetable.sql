CREATE TABLE timetable1 (
    timetable_id SERIAL PRIMARY KEY,
    division VARCHAR(10),
    day_name VARCHAR(15),
    subject VARCHAR(100),
    teacher_id INT REFERENCES teachers2(teacher_id),

    lecture_start TIME,
    lecture_end TIME,

    in_time_start TIME,
    in_time_end TIME,

    out_time_start TIME,
    out_time_end TIME
);

ALTER TABLE timetable1
ADD CONSTRAINT fk_timetable_teacher
FOREIGN KEY (teacher_id)
REFERENCES teachers2(teacher_id);
