import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, GraduationCap, Calendar, BarChart3 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Student Management", url: "/admin/students", icon: Users },
  { title: "Teacher Management", url: "/admin/teachers", icon: GraduationCap },
  { title: "Timetable", url: "/admin/timetable", icon: Calendar },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
];

export const Route = createFileRoute("/admin")({
  component: () => <DashboardShell role="Admin" items={items} title="Admin Panel" />,
});