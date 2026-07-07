import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScanFace, Shield, GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AttendAI" }, { name: "description", content: "Sign in to AttendAI as admin or teacher." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "teacher">("admin");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name");
    if (!/^\d{8}$/.test(password)) return toast.error("Password must be exactly 8 digits");
    toast.success(`Welcome ${role === "admin" ? "Admin" : "Teacher"} ${name}`);
    navigate({ to: role === "admin" ? "/admin" : "/teacher" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--gradient-subtle)" }}>
      <div className="absolute top-0 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-accent)" }} />

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <div className="bg-card rounded-3xl shadow-[var(--shadow-elegant)] p-8 border border-border/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <ScanFace className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Welcome back</h1>
              <p className="text-xs text-muted-foreground">Sign in to continue</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-6">
            <button type="button" onClick={() => setRole("admin")} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${role === "admin" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
              <Shield className="w-4 h-4" /> Admin
            </button>
            <button type="button" onClick={() => setRole("teacher")} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${role === "teacher" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
              <GraduationCap className="w-4 h-4" /> Teacher
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password (8 digits)</Label>
              <Input id="password" type="password" inputMode="numeric" maxLength={8} value={password} onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full h-11 text-base shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
              Sign in as {role === "admin" ? "Admin" : "Teacher"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}