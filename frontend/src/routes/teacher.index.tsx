/*import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCheck, UserX, Users, Clock, ScanFace } from "lucide-react";
import { StatCard, Section } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/")({ component: TeacherDashboard });

function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome, Teacher</h2>
        <p className="text-muted-foreground text-sm">Your classes for today, attendance, and quick actions.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={24} gradient="primary" />
        <StatCard icon={UserCheck} label="Present Today" value={21} trend="87.5%" gradient="success" />
        <StatCard icon={UserX} label="Absent Today" value={3} gradient="warning" />
        <StatCard icon={Clock} label="Classes Today" value={3} gradient="accent" />
      </div>

      <div className="rounded-2xl p-6 border border-border/60 shadow-[var(--shadow-card)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-background/20 text-primary-foreground text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> NEXT CLASS
            </div>
            <h3 className="text-2xl font-bold text-primary-foreground">Computer Science • Division A</h3>
            <p className="text-primary-foreground/85 text-sm mt-1">Starts at 11:00 AM — webcam will auto-open for 20 minutes.</p>
          </div>
          <Link to="/teacher/attendance">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <ScanFace className="w-4 h-4 mr-2" /> Open Attendance
            </Button>
          </Link>
        </div>
      </div>

      <Section title="Today's Activity">
        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success"><UserCheck className="w-4 h-4" /></div><div><p className="font-medium">Mathematics 09:00 — 10:00</p><p className="text-xs text-muted-foreground">Division A • 11/12 present</p></div></div>
            <span className="text-xs text-muted-foreground">Auto-marked</span>
          </li>
          <li className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary"><Clock className="w-4 h-4" /></div><div><p className="font-medium">Computer Science 11:00 — 12:00</p><p className="text-xs text-muted-foreground">Starts in 12 min</p></div></div>
            <span className="text-xs text-primary font-semibold">Upcoming</span>
          </li>
        </ul>
      </Section>
    </div>
  );
}*/
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserCheck, UserX, Users, Clock, ScanFace } from "lucide-react";
import { StatCard, Section } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/teacher/")({
  component: TeacherDashboard
});


type DashboardData = {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  classesToday: number;

  nextClass: {
    subject: string;
    division: string;
    time: string;
  };

  activities: {
    subject: string;
    time: string;
    division: string;
    present: string;
    status: string;
  }[];
};


function TeacherDashboard() {


  const [data, setData] = useState<DashboardData | null>(null);


  const fetchDashboard = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/teacher/dashboard"
      );


      const result = await response.json();

      setData(result);


    } catch(error){

      console.log("Failed to load dashboard");

    }

  };


  useEffect(()=>{

    fetchDashboard();

  },[]);



  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome, Teacher
        </h2>

        <p className="text-muted-foreground text-sm">
          Your classes for today, attendance, and quick actions.
        </p>
      </div>



      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">


        <StatCard 
          icon={Users}
          label="Total Students"
          value={data?.totalStudents ?? 0}
          gradient="primary"
        />


        <StatCard 
          icon={UserCheck}
          label="Present Today"
          value={data?.presentToday ?? 0}
          gradient="success"
        />


        <StatCard 
          icon={UserX}
          label="Absent Today"
          value={data?.absentToday ?? 0}
          gradient="warning"
        />


        <StatCard 
          icon={Clock}
          label="Classes Today"
          value={data?.classesToday ?? 0}
          gradient="accent"
        />

      </div>




      <div 
        className="rounded-2xl p-6 border border-border/60 shadow-[var(--shadow-card)]"
        style={{ background: "var(--gradient-hero)" }}
      >

        <div className="flex flex-wrap items-center justify-between gap-4">


          <div>


            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-background/20 text-primary-foreground text-xs font-semibold mb-2">

              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />

              NEXT CLASS

            </div>



            <h3 className="text-2xl font-bold text-primary-foreground">

              {data?.nextClass?.subject ?? "No class"}

              {" • "}

              {data?.nextClass?.division ?? ""}

            </h3>



            <p className="text-primary-foreground/85 text-sm mt-1">

              Starts at {data?.nextClass?.time ?? "--"}

              {" — webcam will auto-open for attendance."}

            </p>


          </div>



          <Link to="/teacher/attendance">

            <Button 
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >

              <ScanFace className="w-4 h-4 mr-2"/>

              Open Attendance

            </Button>

          </Link>


        </div>

      </div>






      <Section title="Today's Activity">


        <ul className="space-y-3 text-sm">


        {data?.activities?.map((item,index)=>(


          <li 
          key={index}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40"
          >


          <div className="flex items-center gap-3">


          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center text-success">

            <UserCheck className="w-4 h-4"/>

          </div>



          <div>

          <p className="font-medium">

          {item.subject} {item.time}

          </p>


          <p className="text-xs text-muted-foreground">

          {item.division} • {item.present}

          </p>


          </div>


          </div>



          <span className="text-xs text-muted-foreground">

          {item.status}

          </span>


          </li>


        ))}


        </ul>


      </Section>


    </div>
  );
}