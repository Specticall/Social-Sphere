import { FETCH_TIME_SECONDS } from "./config";
import { data, db, setDb } from "../Data/data";

// SIMULATES DATA FETCHING
export const fetchData = (url, type = "GET", newData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!url.includes("www.mockdb/"))
        resolve({ ok: false, status: 404 });

      if (type === "GET") {
        if (url.includes("all-user"))
          resolve({
            ok: true,
            status: 200,
            json: db,
          });
      }

      if (type === "POST" && url.includes("post")) {
        resolve(
          (() => {
            setDb(newData);

            return {
              ok: true,
              status: 200,
              message: "CHANGED",
              updated: db,
            };
          })()
        );
      }

      resolve({ ok: false, status: 404 });
    }, FETCH_TIME_SECONDS * 1000);
  });
};

export const getData = async (URL) => {
  try {
    const res = await fetchData(URL);
    const data = res.json;

    if (!res.ok)
      throw new Error("Whoops! Something went wrong");

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

export const postData = async (URL, newData) => {
  try {
    const res = await fetchData(URL, "POST", newData);
    const data = res.updated;

    if (!res.ok)
      throw new Error("Whoops! Something went wrong");

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

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
