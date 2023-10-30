import { FETCH_TIME_SECONDS } from "./config";
import { data, db, setDb } from "../Data/data";

/**
 * Simulates Data Fetching
 * @param {string} url - "www.mockupdb/"
 * @param {*} type - "POST", "GET"
 * @param {*} newData - Entire modified user object, can not be singular
 * @returns {promise}
 */
export const fetchData = (url, type = "GET", newData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!url.includes("www.mockdb/"))
        resolve({
          ok: false,
          status: 404,
          message: "Invalid URL",
        });

      if (type === "GET") {
        if (url.includes("user_all"))
          resolve({
            ok: true,
            status: 200,
            json: db,
          });

        if (url.includes("user_id")) {
          const userIdInput = url.split("?=").at(-1);
          const targetUser = db.find(
            (user) => user.id === userIdInput
          );

          if (!targetUser)
            resolve({
              ok: false,
              status: 404,
              message: "unable to find user",
            });

          resolve({
            ok: true,
            status: 200,
            json: targetUser,
          });
        }
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

      resolve({
        ok: false,
        status: 404,
        message: "Something Went Wrong",
      });
    }, FETCH_TIME_SECONDS * 1000);
  });
};

/**
 * Gets data from database
 * @param {string} URL - "www.mockdb/{"user_all", "user_id?=[ID HERE]"}"
 */
export const getData = async (URL) => {
  try {
    const res = await fetchData(URL);
    const data = res.json;

    if (!res.ok) throw new Error(res.message || "Error");

    return data;
  } catch (err) {
    console.log(err.message);
  }
};

// This is not what the real world db looks like but for this scenario, it's fine
/**
 * Modify / replace database with given data
 * @param {string} URL - "www.mockdb/post"
 * @param {Object} newData - Entire array of user objects, cannot be singular
 */
export const postData = async (URL, newData) => {
  try {
    const res = await fetchData(URL, "POST", newData);
    const data = res.updated;

    if (!res.ok)
      throw new Error("Whoops! Something went wrong");

    return data;
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
