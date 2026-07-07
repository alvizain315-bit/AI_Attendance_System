export type Student = { id: string; roll: string; name: string; division: "A" | "B"; email: string; parentPhone: string };
export type Teacher = { id: string; empId: string; name: string; subject: string; email: string };
export type TimetableEntry = { day: string; time: string; subject: string; teacher: string };

export const students: Student[] = Array.from({ length: 24 }, (_, i) => {
  const div = i < 12 ? "A" : "B";
  const n = (i % 12) + 1;
  const names = ["Aarav Sharma","Diya Patel","Vihaan Iyer","Ananya Singh","Arjun Reddy","Saanvi Kapoor","Reyansh Gupta","Ishita Joshi","Kabir Mehta","Aadhya Nair","Ayaan Khan","Myra Verma"];
  return {
    id: `s${i+1}`,
    roll: `${div}${String(n).padStart(2, "0")}`,
    name: names[n-1],
    division: div as "A" | "B",
    email: `${names[n-1].toLowerCase().replace(" ", ".")}@school.edu`,
    parentPhone: `+91 9${String(800000000 + i*131).slice(0,9)}`,
  };
});

export const teachers: Teacher[] = [
  { id: "t1", empId: "EMP1001", name: "Dr. Meera Krishnan", subject: "Mathematics", email: "meera@school.edu" },
  { id: "t2", empId: "EMP1002", name: "Prof. Rohan Desai", subject: "Physics", email: "rohan@school.edu" },
  { id: "t3", empId: "EMP1003", name: "Ms. Priya Nair", subject: "Computer Science", email: "priya@school.edu" },
  { id: "t4", empId: "EMP1004", name: "Mr. Arun Bose", subject: "Chemistry", email: "arun@school.edu" },
  { id: "t5", empId: "EMP1005", name: "Mrs. Kavya Rao", subject: "English", email: "kavya@school.edu" },
];

export const timetable: Record<"A" | "B", TimetableEntry[]> = {
  A: [
    { day: "Mon", time: "09:00 - 10:00", subject: "Mathematics", teacher: "Dr. Meera Krishnan" },
    { day: "Mon", time: "10:00 - 11:00", subject: "Physics", teacher: "Prof. Rohan Desai" },
    { day: "Mon", time: "11:00 - 12:00", subject: "Computer Science", teacher: "Ms. Priya Nair" },
    { day: "Tue", time: "09:00 - 10:00", subject: "Chemistry", teacher: "Mr. Arun Bose" },
    { day: "Tue", time: "10:00 - 11:00", subject: "English", teacher: "Mrs. Kavya Rao" },
    { day: "Wed", time: "09:00 - 10:00", subject: "Mathematics", teacher: "Dr. Meera Krishnan" },
    { day: "Wed", time: "11:00 - 12:00", subject: "Physics", teacher: "Prof. Rohan Desai" },
  ],
  B: [
    { day: "Mon", time: "09:00 - 10:00", subject: "Physics", teacher: "Prof. Rohan Desai" },
    { day: "Mon", time: "10:00 - 11:00", subject: "Mathematics", teacher: "Dr. Meera Krishnan" },
    { day: "Mon", time: "11:00 - 12:00", subject: "Chemistry", teacher: "Mr. Arun Bose" },
    { day: "Tue", time: "09:00 - 10:00", subject: "Computer Science", teacher: "Ms. Priya Nair" },
    { day: "Tue", time: "10:00 - 11:00", subject: "English", teacher: "Mrs. Kavya Rao" },
    { day: "Wed", time: "10:00 - 11:00", subject: "Mathematics", teacher: "Dr. Meera Krishnan" },
    { day: "Wed", time: "11:00 - 12:00", subject: "Physics", teacher: "Prof. Rohan Desai" },
  ],
};