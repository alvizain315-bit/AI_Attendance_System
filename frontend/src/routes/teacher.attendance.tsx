import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Check, X, Clock, AlertCircle, Bell, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { students } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/teacher/attendance")({ component: AttendancePage });

type Status = "present" | "absent";
type Phase = "idle" | "scanning-in" | "between" | "scanning-out" | "done";

function AttendancePage() {
  const [div, setDiv] = useState<"A" | "B">("A");
  const [lecture, setLecture] = useState({
  subject: "",
  start: "",
  end: ""
});

const [roster, setRoster] = useState<any[]>([]);
  //const [lecture] = useState({ subject: "Computer Science", start: "11:00", end: "12:00" });
  //const roster = students.filter((s) => s.division === div);
  const [attendance, setAttendance] = useState<Record<string, Status>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  useEffect(() => {

  const fetchAttendanceData = async () => {

    try {

      const lectureRes = await fetch(
        `http://localhost:5000/current-lecture?division=${div}`
      );

      const lectureData = await lectureRes.json();

      setLecture(lectureData);



      const studentRes = await fetch(
        `http://localhost:5000/students?division=${div}`
      );

      const studentData = await studentRes.json();

      setRoster(studentData);



    } catch(error){

      console.log("Failed to fetch attendance data");

    }

  };


  fetchAttendanceData();


}, [div]);

  // Auto schedule simulation: start scan immediately on mount (lecture "begins now")
  useEffect(() => {
    setAttendance(
      Object.fromEntries(
        roster.map((s) => [String(s.student_id), "absent" as Status]),
      ),
    );
    if (roster.length > 0) startScan("in");
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [div, roster]);

  // Countdown timer
  useEffect(() => {
    if (phase === "idle" || phase === "between" || phase === "done") return;
    if (secondsLeft <= 0) {
      stopStream();
      if (phase === "scanning-in") {
        setPhase("between");
        toast.info("Entry window closed. Out-time window opens in last 10 minutes.");
        notifyAbsent();
      } else if (phase === "scanning-out") {
        setPhase("done");
        toast.success("Attendance finalized for this lecture.");
      }
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, phase]);

  // Simulated face recognition: progressively mark students present during scan
  useEffect(() => {
    if (phase !== "scanning-in" && phase !== "scanning-out") return;
    const id = setInterval(() => {
      setAttendance((prev) => {
        const absentIds = roster
          .filter((s) => prev[String(s.student_id)] === "absent")
          .map((s) => String(s.student_id));
        if (absentIds.length === 0) return prev;
        const pick = absentIds[Math.floor(Math.random() * absentIds.length)];
        // Don't auto-mark everyone — leave ~15% absent during entry window
        if (Math.random() < 0.25) return prev;
        return { ...prev, [pick]: "present" };
      });
    }, 1800);
    return () => clearInterval(id);
  }, [phase, roster]);

  async function startScan(window: "in" | "out") {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      toast.error("Webcam unavailable — running in simulation mode.");
    }
    if (window === "in") {
      setPhase("scanning-in");
      setSecondsLeft(20 * 60); // 20 minute entry window
      toast.success("Entry window opened — face recognition active for 20 min");
    } else {
      setPhase("scanning-out");
      setSecondsLeft(10 * 60); // last 10 min out-time window
      toast.success("Out-time window opened — verifying final attendance");
    }
  }

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  function notifyAbsent() {
    const absent = roster.filter(
      (s) => attendance[String(s.student_id)] === "absent",
    );
    if (absent.length) toast.message(`📩 Parent notifications sent to ${absent.length} absent student(s)`);
  }

  function toggle(id: string) {
    setAttendance((p) => ({ ...p, [id]: p[id] === "present" ? "absent" : "present" }));
  }

  const present = Object.values(attendance).filter((v) => v === "present").length;
  const absent = roster.length - present;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const phaseLabel = {
    idle: "Idle",
    "scanning-in": "Entry Window — LIVE",
    between: "Class in progress",
    "scanning-out": "Out-time Window — LIVE",
    done: "Lecture Complete",
  }[phase];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Attendance</h2>
          <p className="text-muted-foreground text-sm">Face recognition runs automatically based on the timetable.</p>
        </div>
        <div className="flex p-1 bg-muted rounded-xl">
          {(["A", "B"] as const).map((d) => (
            <button key={d} onClick={() => { stopStream(); setDiv(d); }} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${div === d ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
              Division {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/60" style={{ background: "var(--gradient-subtle)" }}>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Lecture</div>
                <div className="font-bold text-lg">{lecture.subject} • Division {div}</div>
                <div className="text-xs text-muted-foreground">{lecture.start} — {lecture.end}</div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${(phase === "scanning-in" || phase === "scanning-out") ? "bg-destructive/10 text-destructive" : phase === "between" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
                  {(phase === "scanning-in" || phase === "scanning-out") && <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />}
                  {phaseLabel}
                </div>
                {(phase === "scanning-in" || phase === "scanning-out") && (
                  <div className="mt-2 flex items-center justify-end gap-1.5 text-sm font-mono font-semibold"><Clock className="w-4 h-4" />{mm}:{ss}</div>
                )}
              </div>
            </div>

            <div className="relative aspect-video bg-foreground/95">
              {(phase === "scanning-in" || phase === "scanning-out") ? (
                <>
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  <ScanOverlay />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-background/80 gap-3">
                  <CameraOff className="w-12 h-12 opacity-60" />
                  <p className="text-sm">{phase === "between" ? "Webcam closed — out-time window opens in last 10 min" : phase === "done" ? "Attendance finalized" : "Webcam idle"}</p>
                  {phase === "between" && <Button onClick={() => startScan("out")} variant="secondary"><Camera className="w-4 h-4 mr-2" /> Open Out-time Window Now</Button>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60">
              <Stat label="Present" value={present} color="text-success" icon={Check} />
              <Stat label="Absent" value={absent} color="text-destructive" icon={X} />
              <Stat label="Total" value={roster.length} color="text-primary" icon={ScanFace} />
            </div>
          </div>

          {phase === "scanning-in" && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30 text-sm">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <p>Webcam opened automatically because the lecture has started. You can manually correct any wrongly-marked student below.</p>
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden flex flex-col max-h-[700px]">
          <div className="p-4 border-b border-border/60 flex items-center justify-between">
            <div className="font-semibold">Student Roster</div>
            <button onClick={notifyAbsent} className="text-xs flex items-center gap-1 text-accent hover:underline"><Bell className="w-3 h-3" /> Notify parents</button>
          </div>
          <div className="overflow-y-auto divide-y divide-border/40">
            {roster.map((s) => {
              const studentId = String(s.student_id);
              const st = attendance[studentId];
              const isPresent = st === "present";
              return (
                <div key={studentId} className="flex items-center justify-between p-3 hover:bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${isPresent ? "bg-success/20 text-success" : "bg-destructive/15 text-destructive"}`}>{s.roll_no}</div>
                    <div>
                      <div className="text-sm font-medium">{s.student_name}</div>
                      <div className="text-xs text-muted-foreground">{s.parent_contact}</div>
                    </div>
                  </div>
                  <button onClick={() => toggle(studentId)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isPresent ? "bg-success/15 text-success hover:bg-success/25" : "bg-destructive/15 text-destructive hover:bg-destructive/25"}`}>
                    {isPresent ? "Present" : "Absent"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: any }) {
  return (
    <div className="p-4 text-center">
      <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ScanOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-6 border-2 border-accent/70 rounded-2xl">
        <span className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-accent rounded-tl-2xl" />
        <span className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-accent rounded-tr-2xl" />
        <span className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-accent rounded-bl-2xl" />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-accent rounded-br-2xl" />
      </div>
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" /> REC • Face Recognition Active
      </div>
    </div>
  );
}
