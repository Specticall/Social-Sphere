import { useState } from "react";
import Searchbar from "../Components/Searchbar";
// import { friendData } from "../Data/friendsdata";
import { filterFieldbyId } from "../Helper/helper";
import ProfilePicture from "../Components/ProfilePicture";
import Sort from "../Components/Sort";

const filters = ["Online", "All", "Pending", "Blocked"];

export default function Friends({
  activeUserObject: activeUser,
  allUser,
  handleAcceptFriend,
  handleDeclineFriend,
  handleChangeData,
  handleUnblockFriend,
}) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  let friends = filterFieldbyId(
    allUser,
    activeUser.data.friends
  );

  // Contains all the filter functions / methods
  const filterMethods = [
    friends.filter((friend) => friend.data.isOnline),
    friends,
    filterFieldbyId(allUser, activeUser.data.friendRequest),
    filterFieldbyId(allUser, activeUser.data.blocked),
  ];

  // Filter Friends list
  let filteredFriends = filterMethods[selectedFilter];

  // TEMP
  // Filler data to make the friend list look longer
  // filteredFriends = [...filteredFriends, ...friendData];

  const props = {
    selectedFilter,
    setSelectedFilter,
    activeUser,
    allUser,
    friends,
    filteredFriends,
    handleAcceptFriend,
    handleDeclineFriend,
    handleChangeData,
    handleUnblockFriend,
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
  handleAcceptFriend,
  handleDeclineFriend,
  handleChangeData,
  selectedFilter,
  filteredFriends,
  handleUnblockFriend,
}) {
  const [sortType, setSortType] = useState(0);

  const props = {
    handleAcceptFriend,
    handleDeclineFriend,
    handleChangeData,
    handleUnblockFriend,
  };

  const emptyFriendsMsg = [
    "You Have No Friends",
    "You Have No Friends",
    "You Have No Friend Requests",
    "You Have No User Blocked",
  ];

  const sortingFunctions = [
    (a, b) =>
      a.data.username.localeCompare(b.data.username),
    (a, b) =>
      b.data.username.localeCompare(a.data.username),
  ];

  // Sort the filteredFriends (mutating)
  const sortedFriends = filteredFriends.sort(
    sortingFunctions[sortType]
  );

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
            <ProfilePicture
              pfpLink={friend.data.pfp}
              width={"2.5rem"}
              isOnline={friend.data.isOnline}
            />
            <div className="info">
              <h3 className="name">
                {friend.data.username}
              </h3>
              <p className="tag">{friend.data.tag}</p>
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
  handleAcceptFriend,
  handleDeclineFriend,
  user: targetUser,
}) {
  return (
    <div className="friend-pending-buttons">
      <button
        className="accept"
        onClick={() => handleAcceptFriend(targetUser)}
      >
        <i className="bx bx-check"></i>
      </button>
      <button
        className="decline"
        onClick={() => handleDeclineFriend(targetUser)}
      >
        <i className="bx bx-x"></i>
      </button>
    </div>
  );
}

function FriendBlockedButtons({
  user: targetUser,
  handleUnblockFriend,
}) {
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
