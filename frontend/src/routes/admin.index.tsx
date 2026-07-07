import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Users, GraduationCap, UserCheck, UserX/*, TrendingUp, Calendar*/ } from "lucide-react";
import { StatCard, Section } from "@/components/dashboard-shell";
//import { students, teachers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  //const [students, setStudents] = useState([]);
  //const [teachers, setTeachers] = useState([]);
  //const present = 21;
  //const absent = students.length - present;
    const present = 0;
    const totalStudents = students.length;
    //const absent = totalStudents;
  const absent = students.length;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="text-muted-foreground text-sm">Here's what's happening across your campus today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*}
        <StatCard icon={Users} label="Total Students" value={students.length} trend="+3 this week" gradient="primary" />
        <StatCard icon={GraduationCap} label="Total Teachers" value={teachers.length} gradient="accent" />
        <StatCard icon={UserCheck} label="Present Today" value={present} trend="87.5% attendance" gradient="success" />
        <StatCard icon={UserX} label="Absent Today" value={absent} gradient="warning" />
        */}
        <StatCard icon={Users} label="Total Students" value={students.length} gradient="primary" />

<StatCard icon={GraduationCap} label="Total Teachers" value="-" gradient="accent" />

<StatCard icon={UserCheck} label="Present Today" value="-" gradient="success" />

<StatCard icon={UserX} label="Absent Today" value="-" gradient="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
       {/*} <Section title="Today's Attendance by Division">
  <div className="text-sm text-muted-foreground">
    Attendance data will appear here after database connection.
  </div>
</Section>*/}
<Section title="Today's Attendance by Division">

  <div className="space-y-4">

    <DivisionBar
      div="A"
      present={0}
      total={0}
    />

    <DivisionBar
      div="B"
      present={0}
      total={0}
    />

  </div>

</Section>
        {/*
        <Section title="Today's Attendance by Division">
          <div className="space-y-4">
            <DivisionBar div="A" present={11} total={12} />
            <DivisionBar div="B" present={10} total={12} />
          </div>
        </Section> */}
        {/*<Section title="Recent Activity">
          <ul className="space-y-3 text-sm">
            {[
              { icon: UserCheck, t: "Mathematics class auto-marked", s: "Division A • 11 present", time: "11:20 AM", c: "text-success" },
              { icon: Calendar, t: "Timetable updated for Division B", s: "By Admin", time: "10:05 AM", c: "text-accent" },
              { icon: TrendingUp, t: "Weekly report generated", s: "92% average attendance", time: "Yesterday", c: "text-primary" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50">
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${a.c}`}><a.icon className="w-4 h-4" /></div>
                <div className="flex-1">
                  <p className="font-medium">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.s}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </Section>*/}
        <Section title="Recent Activity">

  <p className="text-sm text-muted-foreground">
    Activity data will load from database.
  </p>

</Section>
      </div>
    </div>
  );
}

function DivisionBar({ div, present, total }: { div: string; present: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((present / total) * 100);
  //const pct = Math.round((present / total) * 100);
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">Division {div}</span>
        <span className="text-muted-foreground">{present}/{total} • {pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: div === "A" ? "var(--gradient-primary)" : "var(--gradient-accent)" }} />
      </div>
    </div>
  );
}