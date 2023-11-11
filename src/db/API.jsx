import { db, setDb } from "./data";
import { FETCH_TIME_SECONDS } from "../Helper/config";
import { chatDb, setChatDb } from "./chatdb";

const putData = (resolve, url, { newData, targetId }) => {
  resolve(
    (() => {
      if (url.includes("user")) setDb(newData, targetId);
      if (url.includes("chat-update"))
        setChatDb(newData, targetId, "modify_chat");

      return {
        ok: true,
        status: 200,
        message: "CHANGED",
        updated: db,
      };
    })()
  );
};

const getData = (resolve, url) => {
  if (url.includes("user_all"))
    resolve({
      ok: true,
      status: 200,
      json: db,
    });

  if (url.includes("user_id")) {
    const targetId = url.split("?=").at(-1);

    // Return if targetUser does not exist
    if (!db[targetId])
      resolve({
        ok: false,
        status: 404,
        message: "unable to find user",
      });

    resolve({
      ok: true,
      status: 200,
      json: db[targetId],
    });
  }

  if (url.includes("chat_log")) {
    const [userId, targetId] = url.split("?=").at(-1).split("/");

    const chatLog = Object.values(chatDb).find(
      (log) => log.user.includes(userId) && log.user.includes(targetId)
    );

    if (chatLog) {
      resolve({
        ok: true,
        status: 200,
        json: chatLog,
      });
    } else {
      resolve({
        ok: false,
        status: 404,
        message: "unable to find log",
      });
    }
  }
};

/**
 * Simulates Data Fetching
 * @param {string} url - "www.mockdb/"
 * @param {string} type - "POST", "GET"
 * @param {Array} newData - Entire modified user object, can not be singular
 * @param {Object} param - An object with the required options
 * @returns {promise}
 */
export const fetchData = (url, type = "GET", param = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!url.includes("www.mockdb/"))
        resolve({
          ok: false,
          status: 404,
          message: "Invalid URL",
        });

      if (type === "GET") getData(resolve, url);
      if (type === "PUT" && url.includes("put")) putData(resolve, url, param);

      resolve({
        ok: false,
        status: 404,
        message: "Something Went Wrong",
      });
    }, FETCH_TIME_SECONDS * 1000);
  });
};
