export const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);

export const isEmptyObject = (obj) =>
  JSON.stringify(obj) === "{}";

// Finds user object(s) from specified array ids on a given field
// Returns an array
export const filterFieldbyId = (field, ids) => {
  return ids.map((id) =>
    field.find((entry) => entry.id === id)
  );
};

/*
Accepts 2 array inputs, a target and a reference

Whenever the target array contains the same element as the
ref array, then the element from the target array gets removed.
  target = [1,2,3]
  ref    = [2,3,4]

target = [1]; Because 2 and 3 exists in the ref array.
*/
export const deleteDuplicatesFrom = (
  targetArray,
  refArray
) => {
  return targetArray.reduce((cleaned, targetEl) => {
    /*
    Creates a new element that contains elements from
    target array except ones that is contined within
    the target element.
    */
    if (!refArray.includes(targetEl))
      cleaned.push(targetEl);
    return cleaned;
  }, []);
};
