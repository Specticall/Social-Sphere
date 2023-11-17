import { useState } from "react";
import Searchbar from "../Components/Searchbar";
import { createFieldPlaceholder, filterFieldbyId } from "../Helper/helper";
import ProfilePicture from "../Components/ProfilePicture";
import Sort from "../Components/Sort";

import Skeleton from "react-loading-skeleton";
import { Loader } from "../Components/Loader";
import FriendUtils from "../Components/FriendUtils";
import { useApp } from "../Context/AppContext";
import { FriendProvider, useFriends } from "../Context/FriendContext";

const filters = ["Online", "All", "Pending", "Blocked"];

export default function Friends() {
  return (
    <FriendProvider>
      <main>
        <div className="page__friends">
          {/* FOR NAV */}
          <div className="left"></div>
          {/* MAIN CONTENT */}
          <div className="right">
            <h1>Your Friends</h1>
            <FriendFilter />
            <FriendListContainer />
          </div>
        </div>
      </main>
    </FriendProvider>
  );
}

function FriendFilter() {
  const { dispatch } = useFriends();
  return (
    <div className="navbar-filters">
      <Filters />
      <Searchbar
        hideProfilePic={true}
        className="filter-search"
        inputWatcher={(query) => {
          dispatch({ type: "set_query", payload: query });
        }}
      />
    </div>
  );
}

function Filters() {
  const { dispatch, state } = useFriends();
  return (
    <ul className="filter">
      {filters.map((label, i) => {
        const elClass = `${
          state.filter === i ? "selected" : null
        } ${label.toLowerCase()}`;

        const elKey = `${label}-${i}`;

        return (
          <li
            className={elClass}
            key={elKey}
            onClick={() => {
              dispatch({ type: "set_filter", payload: i });
            }}
          >
            <p>{label}</p>
          </li>
        );
      })}
    </ul>
  );
}

function FriendListContainer() {
  const { activeUser, allUser } = useApp();
  const { state } = useFriends();

  const getFilteredFriends = ({ friends, query, filter, sort, status }) => {
    if (status === "loading") return createFieldPlaceholder(10, "LOADING");

    const options = {
      sorts: [
        (a, b) => a.username?.localeCompare(b.username),
        (a, b) => b.username?.localeCompare(a.username),
      ],
      filters: [
        friends.filter((friend) => friend.isOnline),
        friends,
        filterFieldbyId(allUser, activeUser.friendRequest),
        filterFieldbyId(allUser, activeUser.blocked),
      ],
    };

    /*
    Filter Chain :
    1. Filter Type
    2. Sort
    3. Filter Query
    */
    return options.filters[filter]
      .sort(options.sorts[sort])
      .filter((friend) =>
        friend.username.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
  };

  return (
    <ul className="friends-list">
      <FriendListSort />
      {/* Display empty list if there are no friends */}
      {getFilteredFriends(state).length === 0 && <FriendListEmpty />}
      <FriendList getFilteredFriends={getFilteredFriends} />
    </ul>
  );
}

function FriendListSort() {
  const { state, dispatch } = useFriends();
  return (
    <header>
      <p>{filters.at(state.filter)} - 15</p>
      <Sort
        stateSetter={(type) => {
          dispatch({ type: "set_sort", payload: type });
        }}
      />
    </header>
  );
}

function FriendListEmpty() {
  const emptyFriendsMsg = [
    "You Have No Online Friends",
    "You Have No Friends",
    "You Have No Friend Requests",
    "You Have No User Blocked",
  ];

  const { state } = useFriends();
  return <div className="empty-friends">{emptyFriendsMsg[state.filter]}</div>;
}

function FriendList({ getFilteredFriends }) {
  const { state } = useFriends();
  return getFilteredFriends(state).map((friend) => (
    <li key={friend.id}>
      <FriendListProfile friend={friend} />
      <FriendListContactButtons friend={friend} />
    </li>
  ));
}

function FriendListProfile({ friend }) {
  const { state } = useFriends();
  return (
    <article>
      {state.status === "loading" ? (
        <Skeleton width={"2.5rem"} height={"2.5rem"} borderRadius={"100%"} />
      ) : (
        <ProfilePicture
          pfpLink={friend?.pfp}
          width={"2.5rem"}
          isOnline={friend?.isOnline}
        />
      )}
      <div className="info">
        <h3 className="name">
          {friend?.username || <Skeleton width={"120px"} height={"20px"} />}
        </h3>
        <p className="tag">
          {friend?.tag || <Skeleton width={"80px"} height={"20px"} />}
        </p>
      </div>
    </article>
  );
}

function FriendListContactButtons({ friend }) {
  const { state } = useFriends();
  return (
    <>
      {state.filter === 0 ||
        (state.filter === 1 && <FriendUtils user={friend} />)}
      {state.filter === 2 && <FriendPendingButtons user={friend} />}
      {state.filter === 3 && <FriendBlockedButtons user={friend} />}
    </>
  );
}

// Features component
function FriendPendingButtons({ user: targetUser }) {
  const { state, handleAction } = useFriends();
  /*
  This state will not be reverted to false even after
  the fetching is finished, this is done so that the
  spinning bar will remain until the component is rerendered
  */
  const [isRequesting, setIsRequesting] = useState(() =>
    state.requests.includes(targetUser?.id) ? true : false
  );

  return (
    <div className="friend-pending-buttons">
      {!isRequesting ? (
        <>
          <button
            className="accept"
            onClick={() => {
              if (isRequesting) return;
              handleAction("accept", targetUser);
              setIsRequesting(true);
            }}
          >
            <i className="bx bx-check"></i>
          </button>
          <button
            className="decline"
            onClick={() => {
              if (isRequesting) return;
              handleAction("decline", targetUser);
              setIsRequesting(true);
            }}
          >
            <i className="bx bx-x"></i>
          </button>
        </>
      ) : (
        <Loader isLoading={true} />
      )}
    </div>
  );
}

function FriendBlockedButtons({ user: targetUser }) {
  const { state, handleAction } = useFriends();

  const [isRequesting, setIsRequesting] = useState(() =>
    state.requests.includes(targetUser?.id) ? true : false
  );

  return !isRequesting ? (
    <button
      onClick={() => {
        if (isRequesting) return;
        handleAction("unblock", targetUser);
        setIsRequesting(true);
      }}
      className="unblock"
    >
      Unblock
    </button>
  ) : (
    <Loader isLoading={true} />
  );
}
