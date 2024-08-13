/**
 * Checks if a given value is a valid JSON string.
 *
 * @param value - The value to be checked.
 * @returns A boolean indicating whether the value is a valid JSON string or not.
 */
export function isValidJSON(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if a value is object-like.
 *
 * @param val - The value to check.
 * @returns Returns `true` if the value is object-like, else `false`.
 */
export const isObjectLike = (val: unknown): boolean => val !== null && typeof val === 'object';
