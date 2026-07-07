import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Calendar, ScanFace, BarChart3 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

const items = [
  { title: "Dashboard", url: "/teacher", icon: LayoutDashboard },
  { title: "Timetable", url: "/teacher/timetable", icon: Calendar },
  { title: "Attendance", url: "/teacher/attendance", icon: ScanFace },
  { title: "Reports", url: "/teacher/reports", icon: BarChart3 },
];

export const Route = createFileRoute("/teacher")({
  component: () => <DashboardShell role="Teacher" items={items} title="Teacher Panel" />,
});