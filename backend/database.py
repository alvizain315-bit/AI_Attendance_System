import psycopg2


def get_connection():

    conn = psycopg2.connect(
        host="localhost",
        database="Attendance",
        user="postgres",
        password="1",
        port="5432"
    )

    return conn


print("Database connected successfully") 