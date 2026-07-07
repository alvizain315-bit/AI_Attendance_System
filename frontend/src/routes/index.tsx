import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Clock, Bell, BarChart3, ArrowRight, ScanFace, GraduationCap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Automatic Attendance System — Face Recognition for Classrooms" },
      { name: "description", content: "AI-powered face-recognition attendance system. Automatic capture, real-time reports, and instant parent notifications." },
      { property: "og:title", content: "Automatic Attendance System" },
      { property: "og:description", content: "AI-powered face-recognition attendance for modern classrooms." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <ScanFace className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">AttendAI</span>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-subtle)" }} />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              AI-POWERED ATTENDANCE
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              AI Based Smart Attendance System <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>Using Face Recognition.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Our automatic attendance system uses real-time face recognition to mark students present as they walk in — no roll calls, no paperwork. Teachers get instant reports, parents get instant alerts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login">
                <Button size="lg" className="text-base h-12 px-7 shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="ghost" className="text-base h-12 px-7">
                  How it works
                </Button>
              </a>
            </div>
            <div className="flex gap-8 pt-6 border-t border-border/60">
              <Stat n="98.7%" l="Accuracy" />
              <Stat n="<2s" l="Per student" />
              <Stat n="24/7" l="Reports" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-30" style={{ background: "var(--gradient-hero)" }} />
            <img src={heroImg} alt="Face recognition attendance in a classroom" width={1280} height={896} className="relative rounded-3xl shadow-[var(--shadow-elegant)] w-full h-auto" />
          </div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Everything a modern classroom needs</h2>
          <p className="text-muted-foreground mt-3">From the first ring of the bell to end-of-day reports.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature icon={Clock} title="Auto Start" desc="Webcam opens automatically when the lecture starts and closes after 20 minutes." color="primary" />
          <Feature icon={Camera} title="Face Recognition" desc="Detects multiple students in one frame with high accuracy in real time." color="accent" />
          <Feature icon={Bell} title="Parent Alerts" desc="Absent students' parents are notified instantly via SMS and email." color="primary" />
          <Feature icon={BarChart3} title="Live Reports" desc="Detailed reports of present, absent, and percentage attendance per division." color="accent" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl p-10 lg:p-14 text-center" style={{ background: "var(--gradient-hero)" }}>
          <GraduationCap className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground tracking-tight">Ready to skip the roll call forever?</h2>
          <p className="text-primary-foreground/90 mt-3 max-w-xl mx-auto">Log in as admin or teacher and run your first auto-attendance session today.</p>
          <Link to="/login" className="inline-block mt-7">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base bg-background text-foreground hover:bg-background/90">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AttendAI. Built for smarter classrooms.
      </footer>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-foreground">{n}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc, color }: { icon: any; title: string; desc: string; color: "primary" | "accent" }) {
  return (
    <div className="group p-6 rounded-2xl bg-card border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4`} style={{ background: color === "primary" ? "var(--gradient-primary)" : "var(--gradient-accent)" }}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
