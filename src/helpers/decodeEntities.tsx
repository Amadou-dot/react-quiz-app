/***
 * Decode HTML entities
 * @param {string} str - the string to decode
 * @returns {string}  the decoded string
 * @example decodeEntities('The &quot;quote&quot;') --> 'The "quote"'
 */
export const decodeEntities = (str: string): string => str.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
