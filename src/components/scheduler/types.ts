export interface DayEvent {
  id: string;
  title: string;
  description?: string;
  startHour: number;
  endHour: number;
    color?: string;
    duration: number;
  priority?: "low" | "medium" | "high";
  tag?: string;
}
