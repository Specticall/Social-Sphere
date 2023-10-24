import { useState } from "react";
import Searchbar from "../Components/Searchbar";
// import { friendData } from "../Data/friendsdata";
import { filterFieldbyId } from "../Helper/helper";
import ProfilePicture from "../Components/ProfilePicture";

const filters = ["Online", "All", "Pending", "Blocked"];

export default function Friends({
  activeUserObject: activeUser,
  allUser,
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

function FriendList({ selectedFilter, filteredFriends }) {
  // console.log("FILTERED FRIENDS =>", filteredFriends);

  return (
    <ul className="friends-list">
      {/* SORT */}
      <header>
        <p>{filters.at(selectedFilter)} - 15</p>
        <div className="friend-sort__container">
          <label htmlFor="friend-sort">Sort by</label>
          <select id="friend-sort" className="sort">
            <option value="Sort by A - Z">A - Z</option>
            <option value="Sort by Z - A">Z - A</option>
          </select>
        </div>
      </header>
      {/* FRIENDS LIST */}
      {filteredFriends.map((friend) => (
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
        </li>
      ))}
    </ul>
  );
}
