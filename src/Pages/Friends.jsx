import { useEffect, useReducer, useState } from "react";
import Searchbar from "../Components/Searchbar";
import {
  createFieldPlaceholder,
  deleteElementAtIndex,
  filterFieldbyId,
} from "../Helper/helper";
import ProfilePicture from "../Components/ProfilePicture";
import Sort from "../Components/Sort";
import {
  handleAcceptFriend,
  handleDeclineFriend,
  handleUnblockFriend,
} from "../Helper/model_friend";
import Skeleton from "react-loading-skeleton";
import { Loader } from "../Components/Loader";
import FriendUtils from "../Components/FriendUtils";

const filters = ["Online", "All", "Pending", "Blocked"];
const initialState = {
  // "loading", "ready"
  status: "loading",
  // allFriends: createFieldPlaceholder(10, "LOADING"),
  friends: createFieldPlaceholder(10, "LOADING"),
  filter: 0,
  query: "",
  sort: 0,
  requests: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "get_friends":
      return { ...state, friends: action.payload, status: "ready" };
    case "set_filter":
      return {
        ...state,
        filter: action.payload,
      };
    case "set_query":
      return {
        ...state,
        query: action.payload,
      };
    case "set_sort":
      return {
        ...state,
        sort: action.payload,
      };
    case "add_request":
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case "remove_request":
      return {
        ...state,
        requests: deleteElementAtIndex(
          state.requests,
          state.requests.indexOf(action.payload)
        ),
      };

    default:
      throw new Error("Reducer not specified");
  }
}

export default function Friends({ activeUser, allUser, setDataUpdated }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Wait for friend data.
  useEffect(() => {
    if (!activeUser) return;
    const friends = filterFieldbyId(allUser, activeUser.friends);

    dispatch({ type: "get_friends", payload: friends });
  }, [allUser, activeUser?.friends, activeUser]);

  const props = {
    activeUser,
    allUser,
    setDataUpdated,
    state,
    dispatch,
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

function FriendFilter({ dispatch, state }) {
  return (
    <div className="navbar-filters">
      <Filters dispatch={dispatch} state={state} />
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

function Filters({ dispatch, state }) {
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

function FriendList({ activeUser, setDataUpdated, allUser, state, dispatch }) {
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

  const emptyFriendsMsg = [
    "You Have No Online Friends",
    "You Have No Friends",
    "You Have No Friend Requests",
    "You Have No User Blocked",
  ];

  /**
   * Handles friend list manipulation task
   * @param {String} type - "accept", "decline", "unblock"
   * @param {Object} targetUser  - "target user object"
   */
  const handleAction = (type, targetUser) => {
    const stateSetter = () => {
      setDataUpdated(true);
      dispatch({ type: "remove_request", payload: targetUser.id });
    };
    const dependencies = [activeUser, targetUser.id, stateSetter];

    if (type === "accept") handleAcceptFriend(...dependencies);
    if (type === "decline") handleDeclineFriend(...dependencies);
    if (type === "unblock") handleUnblockFriend(...dependencies);

    dispatch({ type: "add_request", payload: targetUser.id });
  };

  const props = {
    activeUser,
    setDataUpdated,
    dispatch,
    state,
    handleAction,
  };

  return (
    <ul className="friends-list">
      {/* SORT */}
      <header>
        <p>{filters.at(state.filter)} - 15</p>
        <Sort
          stateSetter={(type) => {
            dispatch({ type: "set_sort", payload: type });
          }}
        />
      </header>

      {/* FRIENDS LIST */}

      {/* Empty Message */}
      {getFilteredFriends(state).length === 0 && (
        <div className="empty-friends">{emptyFriendsMsg[state.filter]}</div>
      )}

      {/* List */}
      {getFilteredFriends(state).map((friend) => (
        <li key={friend.id}>
          {/* FRIEND PROFILE */}

          <article>
            {state.status === "loading" ? (
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
                  <Skeleton width={"120px"} height={"20px"} />
                )}
              </h3>
              <p className="tag">
                {friend?.tag || <Skeleton width={"80px"} height={"20px"} />}
              </p>
            </div>
          </article>

          {/* CONTACT BUTTONS */}

          {state.filter === 0 ||
            (state.filter === 1 && <FriendUtils {...props} user={friend} />)}
          {state.filter === 2 && (
            <FriendPendingButtons {...props} user={friend} />
          )}
          {state.filter === 3 && (
            <FriendBlockedButtons {...props} user={friend} />
          )}
        </li>
      ))}
    </ul>
  );
}

// Features component
function FriendPendingButtons({ user: targetUser, state, handleAction }) {
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

function FriendBlockedButtons({ user: targetUser, state, handleAction }) {
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
