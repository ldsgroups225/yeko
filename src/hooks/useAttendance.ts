import { attendance } from '@modules/core/services/punctualityService';
import { IAttendanceDTO } from '@modules/core/types/IAttendanceDTO';
import { useState } from 'react';

/**
 * Return type for the `useAttendance` hook.
 */
interface UseAttendanceReturn {
  getAttendance: (attendanceId: string) => Promise<IAttendanceDTO | null>;
  getAttendances: (studentId: string) => Promise<IAttendanceDTO[] | null>;
  loading: boolean;
  error: string | null;
}

/**
 * Custom React hook for managing attendance-related data and actions.
 *
 * Provides functions for getting attendance records, while managing loading
 * and error states.
 *
 * @returns {UseAttendanceReturn} An object containing functions and state for managing attendance data.
 */
export const useAttendance = (): UseAttendanceReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Asynchronously gets an attendance record by ID.
   *
   * Updates the loading and error states accordingly.
   *
   * @param {string} attendanceId - The ID of the attendance record to retrieve.
   * @returns {Promise<Attendance | null>} A promise that resolves to the attendance object if successful,
   *                                             or null if an error occurs.
   */
  const getAttendance = async (attendanceId: string): Promise<IAttendanceDTO | null> => {
    setLoading(true);
    setError(null);
    try {
      return await attendance.getAttendance(attendanceId);
    } catch (err) {
      setError('Failed to get attendance record.');
      console.error('[E_GET_ATTENDANCE]:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Asynchronously gets all attendance records.
   *
   * Updates the loading and error states accordingly.
   *
   * @returns {Promise<Attendance[] | null>} A promise that resolves to an array of attendance objects if successful,
   *                                               or null if an error occurs.
   */
  const getAttendances = async (studentId: string): Promise<IAttendanceDTO[] | null> => {
    setLoading(true);
    setError(null);
    try {
      return await attendance.getAttendances(studentId);
    } catch (err) {
      setError('Failed to get attendance records.');
      console.error('[E_GET_ATTENDANCES]:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAttendance,
    getAttendances,
    loading,
    error,
  };
};
