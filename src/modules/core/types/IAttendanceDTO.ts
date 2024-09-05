export type AttendanceStatus = "present" | "absent" | "late";

export interface IAttendanceDTO {
  id: string;
  date: string;
  status: AttendanceStatus;
  isExcused: boolean;
  subject: string;
  startTime: string;
  endTime: string;
}
