from datetime import date, datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_connection


app = Flask(__name__)

CORS(app)


def rows_to_dicts(cursor, rows):
    columns = [desc[0] for desc in cursor.description]
    result = []
    for row in rows:
        obj = {}
        for i, column in enumerate(columns):
            value = row[i]
            if hasattr(value, "isoformat"):
                value = value.isoformat()
            obj[column] = value
        result.append(obj)
    return result


def format_time(value):
    if value is None:
        return ""
    if hasattr(value, "strftime"):
        return value.strftime("%H:%M")
    return str(value)[:5]


@app.route("/")
def home():
    return "Backend running"


@app.route("/students")
def students():
    division = request.args.get("division")

    conn = get_connection()
    cursor = conn.cursor()

    if division:
        cursor.execute(
            "SELECT * FROM students WHERE division = %s ORDER BY roll_no",
            (division,),
        )
    else:
        cursor.execute("SELECT * FROM students ORDER BY roll_no")

    rows = cursor.fetchall()
    result = rows_to_dicts(cursor, rows)

    cursor.close()
    conn.close()

    return jsonify(result)

@app.route("/students", methods=["POST"])
def add_student():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO students
    (roll_no, student_name, division, parent_email, parent_contact)

    VALUES (%s,%s,%s,%s,%s)

    """,
    (
    data["roll_no"],
    data["student_name"],
    data["division"],
    data["parent_email"],
    data["parent_contact"]
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Student added successfully"})

@app.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute(
    "DELETE FROM students WHERE student_id=%s",
    (id,)
    )


    conn.commit()


    cursor.close()
    conn.close()


    return jsonify({"message":"Student deleted"})

@app.route("/teachers")
def teachers():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM teachers2")

    columns = [desc[0] for desc in cursor.description]

    rows = cursor.fetchall()

    cursor.close()
    conn.close()


    result=[]

    for row in rows:
        result.append(dict(zip(columns,row)))


    return jsonify(result)
@app.route("/teachers", methods=["POST"])
def add_teacher():

    data=request.json
    print(data)

    conn=get_connection()
    cursor=conn.cursor()
    
    cursor.execute("""
    INSERT INTO teachers2
    (teacher_name, subject, email)

    VALUES (%s,%s,%s)

    """,
    (
    data["teacher_name"],
    data["subject"],
    data["email"]
    ))

    conn.commit()
    print("Insert done")

    cursor.close()
    conn.close()

    return jsonify({"message":"Teacher added"})

@app.route("/teachers/<int:id>", methods=["DELETE"])
def delete_teacher(id):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM teachers2 WHERE teacher_id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message":"Teacher deleted"})

@app.route("/timetable")
def timetable():

    division = request.args.get("division")

    conn = get_connection()
    cursor = conn.cursor()


    if division:

        cursor.execute(
        """
        SELECT *
        FROM timetable1
        WHERE division=%s
        ORDER BY 
        CASE day_name
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
        WHEN 'Saturday' THEN 6
        END,

        CASE 
        WHEN lecture_start >= '09:00'
        THEN lecture_start
        ELSE lecture_start + interval '12 hour'
        END

        """,
        (division,)
        )


    else:

        cursor.execute(
        """
        SELECT *
        FROM timetable1
        ORDER BY 
        CASE day_name
        WHEN 'Monday' THEN 1
        WHEN 'Tuesday' THEN 2
        WHEN 'Wednesday' THEN 3
        WHEN 'Thursday' THEN 4
        WHEN 'Friday' THEN 5
        WHEN 'Saturday' THEN 6
        END,

        CASE 
        WHEN lecture_start >= '09:00'
        THEN lecture_start
        ELSE lecture_start + interval '12 hour'
        END

        """
        )


    columns=[desc[0] for desc in cursor.description]

    rows=cursor.fetchall()


    cursor.close()
    conn.close()


    result=[]


    for row in rows:

        obj={}

        for i in range(len(columns)):

            value=row[i]

            if hasattr(value,"isoformat"):
                value=value.isoformat()

            obj[columns[i]]=value


        result.append(obj)


    return jsonify(result)

@app.route("/timetable/<int:id>", methods=["PUT"])
def update_timetable(id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE timetable1
        SET 
        subject=%s,
        teacher_id=%s,
        lecture_start=%s,
        lecture_end=%s

        WHERE timetable_id=%s
        """,

        (
        data["subject"],
        data["teacher_id"],
        data["lecture_start"],
        data["lecture_end"],
        id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":"Timetable updated successfully"
    })
@app.route("/attendance-window", methods=["POST"])
def create_attendance_window():

    data = request.json

    timetable_id = data["timetable_id"]
    duration = int(data["duration"])
    out_duration = int(data["out_duration"])


    conn = get_connection()
    cursor = conn.cursor()


    # get lecture timing from timetable

    cursor.execute(
        """
        SELECT lecture_start, lecture_end
        FROM timetable1
        WHERE timetable_id=%s
        """,
        (timetable_id,)
    )


    lecture = cursor.fetchone()


    if not lecture:

        cursor.close()
        conn.close()

        return jsonify({
            "error":"Timetable not found"
        }),404



    lecture_start = lecture[0]
    lecture_end = lecture[1]


    # calculate attendance window


    in_time_start = lecture_start


    in_time_end = (
        datetime.combine(date.today(), lecture_start)
        +
        timedelta(minutes=duration)
    ).time()



    out_time_start = (
        datetime.combine(date.today(), lecture_end)
        -
        timedelta(minutes=out_duration)
    ).time()



    out_time_end = lecture_end

    # save into attendance_window table
    cursor.execute(
"""
UPDATE timetable1
SET

in_time_start=%s,
in_time_end=%s,
out_time_start=%s,
out_time_end=%s

WHERE timetable_id=%s
""",
(
in_time_start,
in_time_end,
out_time_start,
out_time_end,
timetable_id
)
)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({
        "message":"Attendance window created"
    })

@app.route("/current-lecture")
def current_lecture():
    division = request.args.get("division", "A")
    today = date.today()
    day_name = today.strftime("%A")
    now = datetime.now().time()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT subject, lecture_start, lecture_end
        FROM timetable1
        WHERE division = %s
          AND day_name = %s
          AND lecture_start <= %s
          AND lecture_end >= %s
        ORDER BY lecture_start
        LIMIT 1
        """,
        (division, day_name, now, now),
    )
    row = cursor.fetchone()

    if not row:
        cursor.execute(
            """
            SELECT subject, lecture_start, lecture_end
            FROM timetable1
            WHERE division = %s
              AND day_name = %s
              AND lecture_start > %s
            ORDER BY lecture_start
            LIMIT 1
            """,
            (division, day_name, now),
        )
        row = cursor.fetchone()

    if not row:
        cursor.execute(
            """
            SELECT subject, lecture_start, lecture_end
            FROM timetable1
            WHERE division = %s
              AND day_name = %s
            ORDER BY lecture_start
            LIMIT 1
            """,
            (division, day_name),
        )
        row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        return jsonify({"subject": "No lecture scheduled", "start": "", "end": ""})

    subject, start, end = row
    return jsonify(
        {
            "subject": subject,
            "start": format_time(start),
            "end": format_time(end),
        }
    )


@app.route("/teacher/dashboard")
def teacher_dashboard():
    today = date.today()
    day_name = today.strftime("%A")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM students")
    total_students = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM attendance1
        WHERE date = %s AND status = 'present'
        """,
        (today,),
    )
    present_today = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT COUNT(*)
        FROM timetable1
        WHERE day_name = %s
        """,
        (day_name,),
    )
    classes_today = cursor.fetchone()[0]

    cursor.execute(
        """
        SELECT subject, division, lecture_start, lecture_end
        FROM timetable1
        WHERE day_name = %s
          AND lecture_start >= CURRENT_TIME
        ORDER BY lecture_start
        LIMIT 1
        """,
        (day_name,),
    )
    next_class_row = cursor.fetchone()

    if not next_class_row:
        cursor.execute(
            """
            SELECT subject, division, lecture_start, lecture_end
            FROM timetable1
            WHERE day_name = %s
            ORDER BY lecture_start
            LIMIT 1
            """,
            (day_name,),
        )
        next_class_row = cursor.fetchone()

    cursor.execute(
        """
        SELECT t.subject, t.lecture_start, t.lecture_end, t.division
        FROM timetable1 t
        WHERE t.day_name = %s
        ORDER BY t.lecture_start
        LIMIT 5
        """,
        (day_name,),
    )
    activity_rows = cursor.fetchall()

    cursor.close()
    conn.close()

    next_class = {
        "subject": "No class",
        "division": "",
        "time": "--",
    }
    if next_class_row:
        subject, division, start, _end = next_class_row
        next_class = {
            "subject": subject,
            "division": f"Division {division}",
            "time": format_time(start),
        }

    activities = []
    for subject, start, end, division in activity_rows:
        activities.append(
            {
                "subject": subject,
                "time": f"{format_time(start)} — {format_time(end)}",
                "division": f"Division {division}",
                "present": "—",
                "status": "Scheduled",
            }
        )

    return jsonify(
        {
            "totalStudents": total_students,
            "presentToday": present_today,
            "absentToday": max(total_students - present_today, 0),
            "classesToday": classes_today,
            "nextClass": next_class,
            "activities": activities,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)