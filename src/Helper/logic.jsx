import { RECOMMENDATION_AMOUNT } from "./config";
import { randomInt } from "./helper";

// Function that returns certain amount of items from an array
const getRandomElements = (
  arrayInput,
  amount,
  depth = 0
) => {
  const arr = arrayInput.slice();
  const randomIndex = randomInt(0, arr.length - 1);

  const filteredArrDuplicate = arr.filter(
    (_, i) => i !== randomIndex
  );

  // Early exit if we ever run out of users to recommend
  if (arr.length - 1 < 1) return [arr[randomIndex]];

  if (depth < amount - 1) {
    return [
      arr[randomIndex],
      ...getRandomElements(
        filteredArrDuplicate,
        amount,
        depth + 1
      ),
    ];
  } else {
    return [arr[randomIndex]];
  }
};

/*
 Function that gets 5 random ID that are not in
 the user's friend list
*/
export const getRecommendation = (
  userObject,
  targetId,
  amount
) => {
  // Get friend list from target id
  const friendsList = userObject.find(
    (user) => user.id === targetId
  ).data.friends;

  // Get array of every id that exists
  const allId = userObject.map((user) => user.id);

  // Remove ids that are the targetId's friends and the target's itself.
  const filteredList = allId.filter((friendId) => {
    return (
      !friendsList.includes(friendId) &&
      friendId !== targetId
    );
  });

  return getRandomElements(filteredList, amount);
};

/*
[ 01, getRandomElements ]
  [ 05, getRandomElements ]
    [ 07, getRandomElements ]
      [ 10, getRandomElements]
        [ 15, getRandomElements] RETURN item[RAND]
      [ 10, 15]
    [ 07, 10, 15]
  [ 05, 07, 10, 15]
[ 01, 05, 07, 10, 15]

*/
