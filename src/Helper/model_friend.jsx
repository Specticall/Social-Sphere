import { putData } from "../db/backend";
import { deleteDuplicatesFrom } from "./helper";

/**
 *
 * @param {Object} activeUserObject - User that is logged in
 * @param {String} targetId - ID of User which wants to be added as friend
 * @return {void}
 */
export const handleAcceptFriend = (activeUserObject, targetId, stateSetter) => {
  // Abort previous processes (LATER) //BUG

  // Adds the target id to the friend's list array
  const newFriends = [...activeUserObject.friends, targetId];

  // remove target id from pending friend request array
  const newFriendRequest = deleteDuplicatesFrom(
    activeUserObject.friendRequest,
    newFriends
  );

  // Replaces the old data with the new data on the user object itself
  const newData = {
    ...activeUserObject,
    friends: newFriends,
    friendRequest: newFriendRequest,
  };

  const putDataToDb = async () => {
    try {
      await putData("www.mockdb/put/user", newData, activeUserObject.id);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

/**
 * Removes target id from active user's friend request array.
 * @param {Object} activeUserObject
 * @param {String} targetId
 * @param {Function} stateSetter
 */
export const handleDeclineFriend = (
  activeUserObject,
  targetId,
  stateSetter
) => {
  // remove target id from pending friend request array
  const newFriendRequest = activeUserObject.friendRequest.filter(
    (req) => req !== targetId
  );

  const newData = {
    ...activeUserObject,
    friendRequest: newFriendRequest,
  };

  const putDataToDb = async () => {
    try {
      await putData("www.mockdb/put/user", newData, activeUserObject.id);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

export const handleUnblockFriend = (
  activeUserObject,
  targetId,
  stateSetter
) => {
  // remove target id from pending friend request array
  const newBlocked = activeUserObject.blocked.filter((req) => req !== targetId);

  const newData = {
    ...activeUserObject,
    blocked: newBlocked,
  };

  const putDataToDb = async () => {
    try {
      await putData("www.mockdb/put/user", newData, activeUserObject.id);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

/*
TEMP REFERENCE : 
  AAA01: {
    username: "Sarah Wilson",
    occupation: "Software Engineer",
    tag: "@sarahwls",
    pfp: "mEZ3PoFGs_k",
    aboutMe: `"Hi, I'm Sarah – a software engineer by day, photographer by night, weaving code and taste into my digital world."`,
    status: {
      country: "Indonesia",
      city: "Jakarta",
      activity: "Undergrad, Student",
      loveStatus: "Single",
      age: "21",
      tag: "@sarahwls",
    },
    story: {
      dateCreated: Date.now(),
      storyImage: "z4ELCkNmnz0",
      storyDescription:
        "Peaceful sea breeze in nearby beach",
    },
    displayImg: [
      "9S82-KpAEnE",
      "JDrTqKyYPEY",
      "oX91BBCi9z4",
    ],
    friends: ["AAA02", "AAA05", "AAA09"],
    friendRequest: ["AAA07", "AAA03"],
    blocked: ["AAA10"],
    isOnline: Math.random() > 0.5,
    chatId: "CCC01",
  },
*/
