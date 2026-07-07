import { createFileRoute } from "@tanstack/react-router";
import { TimetableView } from "@/components/timetable-view";

export const Route = createFileRoute("/teacher/timetable")({ component: () => <TimetableView title="Weekly Timetable" subtitle="Set by admin — view your scheduled lectures by division." /> });