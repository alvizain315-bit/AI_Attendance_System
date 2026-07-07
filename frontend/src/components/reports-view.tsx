/*import { useState } from "react";
import { Download, UserCheck, UserX, Percent, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard-shell";
import { students } from "@/lib/mock-data";
import { toast } from "sonner";

export function ReportsView() {
  /*const [div, setDiv] = useState<"A" | "B" | "all">("all");
  const list = div === "all" ? students : students.filter((s) => s.division === div);
  const data = list.map((s, i) => ({ ...s, present: 18 + (i % 5), total: 22 }));
  const [div, setDiv] = useState<"A" | "B" | "all">("all");
  const [reportType, setReportType] =
    useState<"daily" | "monthly">("daily");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

const [reportType, setReportType] = useState<"daily" | "monthly">("daily");

const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);


const list =
  div === "all"
    ? students
    : students.filter((s) => s.division === div);


const data = list.map((s, i) => ({
  ...s,

  present:
    reportType === "daily"
      ? (i % 2 === 0 ? 1 : 0)
      : 18 + (i % 5),

  total:
    reportType === "daily"
      ? 1
      : 22
}));
  const totalPresent = data.reduce((a, s) => a + s.present, 0);
  const totalSessions = data.reduce((a, s) => a + s.total, 0);
  const avgPct = Math.round((totalPresent / Math.max(1, totalSessions)) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance Reports</h2>
          <p className="text-muted-foreground text-sm">Detailed attendance analytics for each division.</p>
        </div>
        <Button onClick={() => toast.success("Report exported")} variant="outline" className="border-primary/30">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Total Present" value={totalPresent} gradient="success" />
        <StatCard icon={UserX} label="Total Absent" value={totalSessions - totalPresent} gradient="warning" />
        <StatCard icon={Percent} label="Avg Attendance" value={`${avgPct}%`} gradient="primary" />
        <StatCard icon={TrendingUp} label="Sessions Held" value={22} gradient="accent" />
      </div>

      <div className="flex flex-wrap gap-4 items-center">

<div className="flex p-1 bg-muted rounded-xl">

{(["all","A","B"] as const).map((d)=>(
<button
key={d}
onClick={()=>setDiv(d)}
className={`px-5 py-2 rounded-lg text-sm font-semibold ${
div===d
?"bg-card shadow-sm"
:"text-muted-foreground"
}`}
>

{d==="all"?"All":`Division ${d}`}

</button>
))}

</div>


<div className="flex p-1 bg-muted rounded-xl">

<button
onClick={()=>setReportType("daily")}
className={`px-5 py-2 rounded-lg ${
reportType==="daily"
?"bg-card shadow-sm"
:""
}`}
>
Daily
</button>


<button
onClick={()=>setReportType("monthly")}
className={`px-5 py-2 rounded-lg ${
reportType==="monthly"
?"bg-card shadow-sm"
:""
}`}
>
Monthly
</button>


</div>


<input
type="date"
value={date}
onChange={(e)=>setDate(e.target.value)}
className="border rounded-lg px-3 py-2"
/>

      <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Roll</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Division</th>
              <th className="px-5 py-3 font-semibold">Present / Total</th>
              <th className="px-5 py-3 font-semibold">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s) => {
              const p = Math.round((s.present / s.total) * 100);
              return (
                <tr key={s.id} className="border-t border-border/40 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-primary font-medium">{s.roll}</td>
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3">{s.division}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.present}/{s.total}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[140px] h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full" style={{ width: `${p}%`, background: p >= 80 ? "var(--gradient-primary)" : p >= 60 ? "var(--gradient-accent)" : "oklch(0.65 0.2 25)" }} />
                      </div>
                      <span className={`font-semibold ${p >= 80 ? "text-success" : p >= 60 ? "text-warning" : "text-destructive"}`}>{p}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}*/
import { useState } from "react";
import { Download, UserCheck, UserX, Percent, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard-shell";
//import { students } from "@/lib/mock-data";
import { toast } from "sonner";

export function ReportsView() {
  const [div, setDiv] = useState<"A" | "B" | "all">("all");

  const [reportType, setReportType] = useState<"daily" | "monthly">("daily");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState<any[]>([]);
  /*const list =
    div === "all"
      ? students
      : students.filter((s) => s.division === div);*/

  /*const data = list.map((s, i) => ({
    ...s,
    present:
      reportType === "daily"
        ? (i % 2 === 0 ? 1 : 0)
        : 18 + (i % 5),

    total: reportType === "daily" ? 1 : 22
  }));*/
  const filteredStudents =
  div === "all"
    ? students
    : students.filter((s) => s.division === div);
    const data = filteredStudents.map((s, i) => ({
  ...s,

  present:
    reportType === "daily"
      ? (i % 2 === 0 ? 1 : 0)
      : 18 + (i % 5),

  total: reportType === "daily" ? 1 : 22
}));

  const totalPresent = data.reduce((a, s) => a + s.present, 0);
  const totalSessions = data.reduce((a, s) => a + s.total, 0);
  const avgPct = Math.round(
    (totalPresent / Math.max(1, totalSessions)) * 100
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Attendance Reports
          </h2>
          <p className="text-muted-foreground text-sm">
            View daily and monthly attendance records by division.
          </p>
        </div>

        <Button
          onClick={() => toast.success("Report exported")}
          variant="outline"
          className="border-primary/30"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* STAT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={UserCheck} label="Total Present" value={totalPresent} gradient="success" />
        <StatCard icon={UserX} label="Total Absent" value={totalSessions - totalPresent} gradient="warning" />
        <StatCard icon={Percent} label="Avg Attendance" value={`${avgPct}%`} gradient="primary" />
        <StatCard icon={TrendingUp} label="Sessions Held" value="-" gradient="accent" />
        {/*<StatCard icon={TrendingUp} label="Sessions Held" value={22} gradient="accent" />*/}
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4 items-center">

        {/* Division */}
        <div className="flex p-1 bg-muted rounded-xl">
          {(["all", "A", "B"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiv(d)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold ${
                div === d ? "bg-card shadow-sm" : "text-muted-foreground"
              }`}
            >
              {d === "all" ? "All" : `Division ${d}`}
            </button>
          ))}
        </div>

        {/* Report Type */}
        <div className="flex p-1 bg-muted rounded-xl">
          <button
            onClick={() => setReportType("daily")}
            className={`px-5 py-2 rounded-lg ${
              reportType === "daily" ? "bg-card shadow-sm" : ""
            }`}
          >
            Daily
          </button>

          <button
            onClick={() => setReportType("monthly")}
            className={`px-5 py-2 rounded-lg ${
              reportType === "monthly" ? "bg-card shadow-sm" : ""
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Roll</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Division</th>
              <th className="px-5 py-3 font-semibold">Present / Total</th>
              <th className="px-5 py-3 font-semibold">Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => {
              const p = Math.round((s.present / s.total) * 100);

              return (
                <tr
                  key={s.id}
                  className="border-t border-border/40 hover:bg-muted/30"
                >
                  <td className="px-5 py-3 font-mono text-primary font-medium">
                    {s.roll}
                  </td>
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3">{s.division}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {s.present}/{s.total}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[140px] h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${p}%`,
                            background:
                              p >= 80
                                ? "var(--gradient-primary)"
                                : p >= 60
                                ? "var(--gradient-accent)"
                                : "oklch(0.65 0.2 25)"
                          }}
                        />
                      </div>
                      <span
                        className={`font-semibold ${
                          p >= 80
                            ? "text-success"
                            : p >= 60
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      >
                        {p}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}