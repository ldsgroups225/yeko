import { IAttendanceDTO } from '@modules/core/types/IAttendanceDTO';
import { APPWRITE_DATABASE_ID, ATTENDANCE_COLLECTION_ID, databases } from '@src/network/appwrite';
import { Query } from 'appwrite';

/**
 * Module for managing attendance records.
 * @module attendance
 */
export const attendance = {
  /**
   * Gets an attendance record by its ID.
   * @async
   * @param {string} attendanceId - The ID of the attendance record to retrieve.
   * @returns {Promise<Attendance>} The attendance record with the specified ID.
   * @throws {Error} If there's an error retrieving the attendance record.
   * @example
   * try {
   *   const attendanceRecord = await attendance.getAttendance('attendance123');
   *   console.log(attendanceRecord);
   * } catch (error) {
   *   console.error('Failed to get attendance:', error);
   * }
   */
  async getAttendance(attendanceId: string): Promise<IAttendanceDTO> {
    try {
      const response = await databases.getDocument(
        APPWRITE_DATABASE_ID,
        ATTENDANCE_COLLECTION_ID,
        attendanceId
      );

      return {
        id: response.$id,
        date: response.date,
        status: response.status,
        isExcused: response.isExcused,
        subject: response.subject,
        startTime: response.start_time,
        endTime: response.end_time,
      };
    } catch (error) {
      console.error('Error getting attendance record:', error);
      throw error;
    }
  },

  /**
   * Gets all attendance records.
   * @async
   * @returns {Promise<Attendance[]>} An array of all attendance records.
   * @throws {Error} If there's an error retrieving the attendance records.
   * @example
   * try {
   *   const attendanceRecords = await attendance.getAttendances();
   *   console.log(attendanceRecords);
   * } catch (error) {
   *   console.error('Failed to get attendances:', error);
   * }
   */
  async getAttendances(studentId: string): Promise<IAttendanceDTO[]> {
    try {
      const response = await databases.listDocuments(
        APPWRITE_DATABASE_ID,
        ATTENDANCE_COLLECTION_ID,
        [Query.equal('studentId', studentId)]
      );

      return response.documents.map((document) => ({
        id: document.$id,
        date: document.date,
        status: document.status,
        isExcused: document.isExcused,
        subject: document.subject,
        startTime: document.start_time,
        endTime: document.end_time,
      }));
    } catch (error) {
      console.error('Error getting attendance records:', error);
      throw error;
    }
  },
};
