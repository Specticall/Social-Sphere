import { putData } from "../db/backend";
import { deleteDuplicatesFrom } from "./helper";

/**
 *
 * @param {Object} activeUserObject - User that is logged in
 * @param {Object} targetUserObject - ID of User which wants to be added as friend
 * @return {void}
 */
export const handleAcceptFriend = (
  activeUserObject,
  targetUserObject,
  stateSetter
) => {
  // Abort previous processes (LATER) //BUG

  const createNewUserObject = (activeUserObject, targetUserObject, target) => {
    // Adds the target id to the friend's list array
    const newFriends = [...activeUserObject.friends, targetUserObject.id];

    // remove target id from pending friend request array
    const newFriendRequest = deleteDuplicatesFrom(
      activeUserObject.friendRequest,
      newFriends
    );

    // Replaces the old data with the new data on the user object itself
    if (target === "targetUser") {
      return {
        ...activeUserObject,
        friends: newFriends,
        friendRequest: newFriendRequest,
        outgoingRequest: activeUserObject.outgoingRequest.filter(
          (outgoing) => outgoing !== targetUserObject.id
        ),
      };
    } else {
      return {
        ...activeUserObject,
        friends: newFriends,
        friendRequest: newFriendRequest,
      };
    }
  };

  // Create newData for the current user

  const putDataToDb = async () => {
    try {
      // await putData(
      //   "www.mockdb/put/user",
      //   createNewUserObject(activeUserObject, targetUserObject),
      //   activeUserObject.id
      // );
      // Update data for the the active user and the target user.

      await Promise.all([
        putData(
          "www.mockdb/put/user",
          createNewUserObject(activeUserObject, targetUserObject),
          activeUserObject.id
        ),
        putData(
          "www.mockdb/put/user",
          createNewUserObject(targetUserObject, activeUserObject, "targetUser"),
          targetUserObject.id
        ),
      ]);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

// export const handleAcceptFriend = (activeUserObject, targetId, stateSetter) => {
//   // Abort previous processes (LATER) //BUG

//   // Adds the target id to the friend's list array
//   const newFriends = [...activeUserObject.friends, targetId];

//   // remove target id from pending friend request array
//   const newFriendRequest = deleteDuplicatesFrom(
//     activeUserObject.friendRequest,
//     newFriends
//   );

//   // Replaces the old data with the new data on the user object itself
//   const newData = {
//     ...activeUserObject,
//     friends: newFriends,
//     friendRequest: newFriendRequest,
//   };

//   // Create newData for the current user

//   const putDataToDb = async () => {
//     try {
//       await putData("www.mockdb/put/user", newData, activeUserObject.id);

//       stateSetter();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   putDataToDb();
// };

/**
 * Removes target id from active user's friend request array.
 * @param {Object} activeUserObject
 * @param {String} targetId
 * @param {Function} stateSetter
 */
export const handleDeclineFriend = (
  activeUserObject,
  targetUserObject,
  stateSetter
) => {
  const createNewUserObject = (type) => {
    // remove target id from pending friend request array
    const newFriendRequest = activeUserObject.friendRequest.filter(
      (req) => req !== targetUserObject.id
    );

    if (type === "activeUser") {
      return {
        ...activeUserObject,
        friendRequest: newFriendRequest,
      };
    }
    if (type === "targetUser") {
      return {
        ...targetUserObject,
        outgoingRequest: targetUserObject.outgoingRequest.filter(
          (outgoing) => outgoing != activeUserObject.id
        ),
      };
    }
  };

  const putDataToDb = async () => {
    try {
      await Promise.all([
        putData(
          "www.mockdb/put/user",
          createNewUserObject("activeUser"),
          activeUserObject.id
        ),
        putData(
          "www.mockdb/put/user",
          createNewUserObject("targetUser"),
          targetUserObject.id
        ),
      ]);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

export const handleUnblockFriend = (
  activeUserObject,
  targetUserObject,
  stateSetter
) => {
  // remove target id from pending friend request array
  const newBlocked = activeUserObject.blocked.filter(
    (req) => req !== targetUserObject.id
  );

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

export const handleCancelRequestFriend = (
  activeUserObject,
  targetUserObject,
  stateSetter
) => {
  // Abort previous processes (LATER) //BUG

  const createNewUserObject = (activeUserObject, targetUserObject, target) => {
    // Replaces the old data with the new data on the user object itself
    if (target === "activeUser") {
      return {
        ...activeUserObject,
        outgoingRequest: activeUserObject.outgoingRequest.filter(
          (outgoing) => outgoing !== targetUserObject.id
        ),
      };
    } else if (target === "targetUser") {
      return {
        ...targetUserObject,
        friendRequest: targetUserObject.friendRequest.filter(
          (request) => request !== activeUserObject.id
        ),
      };
    }
  };

  // Create newData for the current user

  const putDataToDb = async () => {
    try {
      await Promise.all([
        putData(
          "www.mockdb/put/user",
          createNewUserObject(activeUserObject, targetUserObject, "activeUser"),
          activeUserObject.id
        ),
        putData(
          "www.mockdb/put/user",
          createNewUserObject(activeUserObject, targetUserObject, "targetUser"),
          targetUserObject.id
        ),
      ]);

      stateSetter();
    } catch (err) {
      console.log(err);
    }
  };

  putDataToDb();
};

export const handleAddRequestFriend = (
  activeUserObject,
  targetUserObject,
  stateSetter
) => {
  const createNewUserObject = (target) => {
    if (target === "activeUser") {
      return {
        ...activeUserObject,
        outgoingRequest: [
          ...activeUserObject.outgoingRequest,
          targetUserObject.id,
        ],
      };
    } else if (target === "targetUser") {
      return {
        ...targetUserObject,
        friendRequest: [targetUserObject.friendRequest, activeUserObject.id],
      };
    }
  };

  const putDataToDb = async () => {
    try {
      await Promise.all([
        putData(
          "www.mockdb/put/user",
          createNewUserObject("activeUser"),
          activeUserObject.id
        ),
        putData(
          "www.mockdb/put/user",
          createNewUserObject("targetUser"),
          targetUserObject.id
        ),
      ]);

      stateSetter();
      console.log("test");
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
