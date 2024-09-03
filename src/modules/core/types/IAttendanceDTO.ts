export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface IAttendanceDTO {
  id: string;
  date: Date;
  status: AttendanceStatus;
  isExcused: boolean;
  subject: string;
  startTime: string;
  endTime: string;
}
