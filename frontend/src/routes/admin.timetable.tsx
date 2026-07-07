import { createFileRoute } from "@tanstack/react-router";
import { TimetableView } from "@/components/timetable-view";

export const Route = createFileRoute("/admin/timetable")({ component: () => <TimetableView title="Timetable Management" subtitle="Set and view weekly schedules per division." editable /> });