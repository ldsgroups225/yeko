import { IHomeworkDTO } from '@modules/core/types/IHomeworkDTO';
import { APPWRITE_DATABASE_ID, HOMEWORK_COLLECTION_ID, databases } from '@src/network/appwrite';
import { Query } from 'appwrite';

/**
 * Module for managing homework records.
 * @module homework
 */
export const homework = {
  /**
   * Gets an homework record by its ID.
   * @async
   * @param {string} homeworkId - The ID of the homework record to retrieve.
   * @returns {Promise<Homework>} The homework record with the specified ID.
   * @throws {Error} If there's an error retrieving the homework record.
   * @example
   * try {
   *   const homeworkRecord = await homework.getHomework('homework123');
   *   console.log(homeworkRecord);
   * } catch (error) {
   *   console.error('Failed to get homework:', error);
   * }
   */
  async getHomework(homeworkId: string): Promise<IHomeworkDTO> {
    try {
      const response = await databases.getDocument(
        APPWRITE_DATABASE_ID,
        HOMEWORK_COLLECTION_ID,
        homeworkId
      );

      return {
        id: response.$id,
        classId: response.class_id,
        subjectId: response.subject_id,
        subjectName: response.subject_name,
        dueDate: response.due_date,
        itWillBeANote: response.is_graded,
      };
    } catch (error) {
      console.error('Error getting homework record:', error);
      throw error;
    }
  },

  /**
   * Gets all homework records.
   * @async
   * @returns {Promise<Homework[]>} An array of all homework records.
   * @throws {Error} If there's an error retrieving the homework records.
   * @example
   * try {
   *   const homeworkRecords = await homework.getHomeworks();
   *   console.log(homeworkRecords);
   * } catch (error) {
   *   console.error('Failed to get homeworks:', error);
   * }
   */
  async getHomeworks(classId: string): Promise<IHomeworkDTO[]> {
    try {
      const response = await databases.listDocuments(APPWRITE_DATABASE_ID, HOMEWORK_COLLECTION_ID, [
        Query.equal('class_id', classId),
      ]);

      return response.documents.map((document) => ({
        id: document.$id,
        classId: document.class_id,
        subjectId: document.subject_id,
        subjectName: document.subject_name,
        dueDate: document.due_date,
        itWillBeANote: document.is_graded,
      }));
    } catch (error) {
      console.error('Error getting homework records:', error);
      throw error;
    }
  },
};
