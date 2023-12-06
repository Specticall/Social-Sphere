export const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);

export const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

/**
 * Finds user object(s) from specified array ids on a given field
 * @param {Array} field - Array of user objects
 * @param {Array} ids - Array of ids (strings)
 * @returns {Array} - Filtered of user objects
 */
export const filterFieldbyId = (field, ids) => {
  return ids.map((id) => field[id]);
};

/*
Accepts 2 array inputs, a target and a reference

Whenever the target array contains the same element as the
ref array, then the element from the target array gets removed.
  target = [1,2,3]
  ref    = [2,3,4]

target = [1]; Because 2 and 3 exists in the ref array.
*/
export const deleteDuplicatesFrom = (targetArray, refArray) => {
  return targetArray.reduce((cleaned, targetEl) => {
    /*
    Creates a new element that contains elements from
    target array except ones that is contained within
    the target element.
    */
    if (!refArray.includes(targetEl)) cleaned.push(targetEl);
    return cleaned;
  }, []);
};

/**
 * Creates a place holder array when data is loading
 * enables skeletons to still be able to load despite having no data.
 * @param {Number} length
 * @param {String} text
 * @returns {Array}
 */
export const createFieldPlaceholder = (length, text) => {
  return new Array(length).fill(text);
};

export const deleteElementAtIndex = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};
