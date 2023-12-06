// Mockup for a backend server

import { fetchData } from "./API";

/**
 * Gets data from database
 *
 * @summary
 * user_id?=[ID HERE] -> Get specific user object from ID
 * @summary
 * user_all -> Get the entire array of user objects
 *
 * @param {string} URL - "www.mockdb/{options}"
 * @example await getData("www.mockdb/user_id?=AAA01")
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

// This is not what the real world db looks like. but for this scenario, it's fine
/**
 * Modify / replace database with given data
 * @param {string} URL - "www.mockdb/put"
 * @param {Object} newData - Entire array of user objects, cannot be singular
 * @param {string} id - id of a user which the data wants to be updated
 *
 * @example putData("www.mockdb/put", { Hello: "WORLD" }, "AAA01");
 */
export const putData = async (URL, newData, targetId) => {
  try {
    const res = await fetchData(URL, "PUT", {
      newData,
      targetId,
    });
    const data = res.updated;
    console.log(data);

    if (!res.ok) throw new Error(res.message);

    return data;
  } catch (err) {
    console.log(err.message);
  }
};
