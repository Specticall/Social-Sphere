import { useEffect, useState } from "react";
import Searchbar from "../Components/Searchbar";
import { friendData } from "../Data/friendsdata";
import {
  createFieldPlaceholder,
  filterFieldbyId,
} from "../Helper/helper";
import ProfilePicture from "../Components/ProfilePicture";
import Sort from "../Components/Sort";
import {
  handleAcceptFriend,
  handleUnblockFriend,
} from "../Helper/model_friend";
import Skeleton from "react-loading-skeleton";
import { Loader } from "../Components/Loader";

const filters = ["Online", "All", "Pending", "Blocked"];

/*
  // handleAcceptFriend,
  // handleChangeData,
  // handleUnblockFriend,
*/
export default function Friends({
  activeUser,
  allUser,
  setDataUpdated,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!activeUser) return;
    setIsLoading(false);
  }, [activeUser]);

  const [selectedFilter, setSelectedFilter] = useState(0);

  let friends =
    isLoading ||
    filterFieldbyId(allUser, activeUser.friends);

  const filterMethods = isLoading || [
    friends.filter((friend) => friend.isOnline),
    friends,
    filterFieldbyId(allUser, activeUser.friendRequest),
    filterFieldbyId(allUser, activeUser.blocked),
  ];

  let filteredFriends = !isLoading
    ? filterMethods[selectedFilter]
    : createFieldPlaceholder(10, "LOADING");

  // TEMP
  // Filler data to make the friend list look longer
  // if (!isLoading)
  //   filteredFriends = [...filteredFriends, ...friendData];

  // console.log(
  //   "FRIEND COMPONENT : ",
  //   !isLoading ? "LOADING FINISHED" : "LOADING...",
  //   filteredFriends
  // );

  const props = {
    selectedFilter,
    setSelectedFilter,
    activeUser,
    allUser,
    friends,
    filteredFriends,
    isLoading,
    setDataUpdated,
  };

  return (
    <div className="page__friends">
      {/* FOR NAV */}
      <div className="left"></div>
      {/* MAIN CONTENT */}
      <div className="right">
        <h1>Your Friends</h1>
        <FriendFilter {...props} />
        <FriendList {...props} />
      </div>
    </div>
  );
}

function FriendFilter({
  selectedFilter,
  setSelectedFilter,
}) {
  return (
    <div className="navbar-filters">
      <ul className="filter">
        {filters.map((label, i) => (
          <li
            className={`${
              selectedFilter === i ? "selected" : null
            } ${label.toLowerCase()}`}
            key={`${label}-${i}`}
            onClick={() => {
              setSelectedFilter(i);
            }}
          >
            <p>{label}</p>
          </li>
        ))}
      </ul>
      <Searchbar
        hideProfilePic={true}
        className="filter-search"
      />
    </div>
  );
}

function FriendList({
  selectedFilter,
  filteredFriends,
  activeUser,
  isLoading,
  setDataUpdated,
}) {
  const [sortType, setSortType] = useState(0);

  const props = {
    activeUser,
    setDataUpdated,
  };

  const emptyFriendsMsg = [
    "You Have No Online Friends",
    "You Have No Friends",
    "You Have No Friend Requests",
    "You Have No User Blocked",
  ];

  const sortingFunctions = isLoading || [
    (a, b) => a.username?.localeCompare(b.username),
    (a, b) => b.username?.localeCompare(a.username),
  ];

  // console.log(
  //   !isLoading ? "LOADING FINISHED" : "LOADING...",
  //   filteredFriends,
  //   isLoading
  //     ? filteredFriends
  //     : filteredFriends?.sort(sortingFunctions[sortType])
  // );

  // Sort the filteredFriends (mutating)
  const sortedFriends = isLoading
    ? filteredFriends
    : filteredFriends?.sort(sortingFunctions[sortType]);

  return (
    <ul className="friends-list">
      {/* SORT */}
      <header>
        <p>{filters.at(selectedFilter)} - 15</p>
        <Sort stateSetter={setSortType} />
      </header>

      {/* FRIENDS LIST */}

      {/* Empty Message */}
      {sortedFriends.length === 0 ? (
        <div className="empty-friends">
          {emptyFriendsMsg[selectedFilter]}
        </div>
      ) : null}

      {/* List */}
      {sortedFriends.map((friend) => (
        <li key={friend.id}>
          {/* FRIEND PROFILE */}

          <article>
            {isLoading ? (
              <Skeleton
                width={"2.5rem"}
                height={"2.5rem"}
                borderRadius={"100%"}
              />
            ) : (
              <ProfilePicture
                pfpLink={friend?.pfp}
                width={"2.5rem"}
                isOnline={friend?.isOnline}
              />
            )}
            <div className="info">
              <h3 className="name">
                {friend?.username || (
                  <Skeleton
                    width={"120px"}
                    height={"20px"}
                  />
                )}
              </h3>
              <p className="tag">
                {friend?.tag || (
                  <Skeleton
                    width={"80px"}
                    height={"20px"}
                  />
                )}
              </p>
            </div>
          </article>

          {/* CONTACT BUTTONS */}

          {selectedFilter === 0 || selectedFilter === 1 ? (
            <FriendMenuButtons {...props} user={friend} />
          ) : null}
          {selectedFilter === 2 ? (
            <FriendPendingButtons
              {...props}
              user={friend}
            />
          ) : null}
          {selectedFilter === 3 ? (
            <FriendBlockedButtons
              {...props}
              user={friend}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

// The buttons on the right side of the friend cell
function FriendMenuButtons() {
  return (
    <div className="buttons">
      <button className="call">
        <i className="bx bx-phone"></i>
      </button>
      <button className="chat">
        <i className="bx bx-chat"></i>
      </button>
      <button className="more">
        <i className="bx bx-dots-vertical-rounded"></i>
      </button>
    </div>
  );
}

// Features component
function FriendPendingButtons({
  user: targetUser,
  activeUser,
  setDataUpdated,
}) {
  const [isRequesting, setIsRequesting] = useState(false);

  return (
    <div className="friend-pending-buttons">
      <button
        className="accept"
        onClick={() => {
          handleAcceptFriend(
            activeUser,
            targetUser.id,
            () => {
              setIsRequesting(false);
              setDataUpdated(true);
            }
          );
          setIsRequesting(true);
        }}
      >
        {isRequesting ? (
          <Loader isLoading={true} />
        ) : (
          <i className="bx bx-check"></i>
        )}
      </button>
      <button className="decline">
        <i className="bx bx-x"></i>
      </button>{" "}
    </div>
  );
}

function FriendBlockedButtons({
  user: targetUser,
  activeUser,
  handleChangeData,
}) {
  const handleUnblockFriend = (unblockedUser) => {
    handleChangeData({
      type: "unblockFriend",
      newData: activeUser.data.blocked.filter(
        (blocked) => blocked !== unblockedUser.id
      ),
      changeTargetId: activeUser.id,
    });
  };

  return (
    <div
      onClick={() => {
        handleUnblockFriend(targetUser);
      }}
    >
      Unblock
    </div>
  );
}
