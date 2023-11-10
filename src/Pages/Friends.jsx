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
import { useLoading } from "../Hooks/useLoading";
import FriendUtils from "../Components/FriendUtils";

const filters = ["Online", "All", "Pending", "Blocked"];
const initialState = {
  // "loading", "ready"
  status: "loading",
  // allFriends: createFieldPlaceholder(10, "LOADING"),
  friends: createFieldPlaceholder(10, "LOADING"),
  filter: 0,
  query: "",
  request: [],
  sort: 0,
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

    default:
      throw new Error("Reducer not specified");
  }
}

export default function Friends({ activeUser, allUser, setDataUpdated }) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading } = useLoading(activeUser);

  // DEPRECATED
  let friends = isLoading || filterFieldbyId(allUser, activeUser.friends);

  // DEPRECATED
  const filterMethods = isLoading || [
    friends.filter((friend) => friend.isOnline),
    friends,
    filterFieldbyId(allUser, activeUser.friendRequest),
    filterFieldbyId(allUser, activeUser.blocked),
  ];

  // DEPRECATED
  const queriedFriends = !isLoading
    ? filterMethods[selectedFilter].filter((friend) =>
        friend.username
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      )
    : createFieldPlaceholder(10, "LOADING");

  // Wait for friend data.
  useEffect(() => {
    const friends = filterFieldbyId(allUser, activeUser.friends);

    dispatch({ type: "get_friends", payload: friends });
  }, [allUser, activeUser.friends]);

  const props = {
    selectedFilter,
    setSelectedFilter,
    activeUser,
    allUser,
    friends,
    queriedFriends,
    isLoading,
    setDataUpdated,
    setSearchQuery,
    requests,
    setRequests,
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

function FriendFilter({
  selectedFilter,
  setSelectedFilter,
  setSearchQuery,
  dispatch,
}) {
  return (
    <div className="navbar-filters">
      <ul className="filter">
        {filters.map((label, i) => {
          const elClass = `${
            selectedFilter === i ? "selected" : null
          } ${label.toLowerCase()}`;

          const elKey = `${label}-${i}`;

          return (
            <li
              className={elClass}
              key={elKey}
              onClick={() => {
                setSelectedFilter(i);
                dispatch({ type: "set_filter", payload: i });
              }}
            >
              <p>{label}</p>
            </li>
          );
        })}
      </ul>
      <Searchbar
        hideProfilePic={true}
        className="filter-search"
        inputWatcher={(query) => {
          setSearchQuery(query);
          dispatch({ type: "set_query", payload: query });
        }}
      />
    </div>
  );
}

function FriendList({
  selectedFilter,
  queriedFriends,
  activeUser,
  isLoading,
  setDataUpdated,
  requests,
  setRequests,
  allUser,
  state,
  dispatch,
}) {
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

  console.log(getFilteredFriends(state));
  // DEPRECATED
  const [sortType, setSortType] = useState(0);

  const props = {
    activeUser,
    setDataUpdated,
    requests,
    setRequests,
  };

  const emptyFriendsMsg = [
    "You Have No Online Friends",
    "You Have No Friends",
    "You Have No Friend Requests",
    "You Have No User Blocked",
  ];
  // DEPRECATED
  const sortingFunctions = isLoading || [
    (a, b) => a.username?.localeCompare(b.username),
    (a, b) => b.username?.localeCompare(a.username),
  ];

  // DEPRECATED
  // Sort the queriedFriends (mutating)
  const sortedFriends = isLoading
    ? queriedFriends
    : queriedFriends?.sort(sortingFunctions[sortType]);

  return (
    <ul className="friends-list">
      {/* SORT */}
      <header>
        <p>{filters.at(selectedFilter)} - 15</p>
        <Sort
          stateSetter={(type) => {
            // DEPRECATED
            setSortType(type);

            dispatch({ type: "set_sort", payload: type });
          }}
        />
      </header>

      {/* FRIENDS LIST */}

      {/* Empty Message */}
      {getFilteredFriends(state).length === 0 && (
        // BUG
        <div className="empty-friends">{emptyFriendsMsg[selectedFilter]}</div>
      )}

      {/* List */}
      {getFilteredFriends(state).map((friend) => (
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
                  <Skeleton width={"120px"} height={"20px"} />
                )}
              </h3>
              <p className="tag">
                {friend?.tag || <Skeleton width={"80px"} height={"20px"} />}
              </p>
            </div>
          </article>

          {/* CONTACT BUTTONS */}

          {selectedFilter === 0 ||
            (selectedFilter === 1 && <FriendUtils {...props} user={friend} />)}
          {selectedFilter === 2 && (
            <FriendPendingButtons {...props} user={friend} />
          )}
          {selectedFilter === 3 && (
            <FriendBlockedButtons {...props} user={friend} />
          )}
        </li>
      ))}
    </ul>
  );
}

// Features component
function FriendPendingButtons({
  user: targetUser,
  activeUser,
  setDataUpdated,
  requests,
  setRequests,
}) {
  /*
  This state will not be reverted to false even after
  the fetching is finished, this is done so that the
  spinning bar will remain until the component is rerendered
  */
  const [isRequesting, setIsRequesting] = useState(
    requests.includes(targetUser?.id) ? true : false
  );

  // Refactored accept / decline friend functions
  const handleAction = (type) => () => {
    if (isRequesting) return;

    const stateSetter = () => {
      setDataUpdated(true);
      setRequests((current) => {
        const index = current.indexOf(targetUser.id);
        return deleteElementAtIndex(current, index);
      });
    };
    const dependencies = [activeUser, targetUser.id, stateSetter];

    if (type === "accept") handleAcceptFriend(...dependencies);
    if (type === "decline") handleDeclineFriend(...dependencies);

    setIsRequesting(true);

    setRequests((current) => {
      return [...current, targetUser.id];
    });
  };

  return (
    <div className="friend-pending-buttons">
      {!isRequesting ? (
        <>
          <button className="accept" onClick={handleAction("accept")}>
            <i className="bx bx-check"></i>
          </button>
          <button className="decline" onClick={handleAction("decline")}>
            <i className="bx bx-x"></i>
          </button>
        </>
      ) : (
        <Loader isLoading={true} />
      )}
    </div>
  );
}

function FriendBlockedButtons({
  user: targetUser,
  activeUser,
  setDataUpdated,
  requests,
  setRequests,
}) {
  const [isRequesting, setIsRequesting] = useState(() =>
    requests.includes(targetUser?.id) ? true : false
  );

  return !isRequesting ? (
    <button
      onClick={() => {
        if (isRequesting) return;

        handleUnblockFriend(activeUser, targetUser.id, () => {
          setDataUpdated(true);
          setRequests((current) => {
            const index = current.indexOf(targetUser.id);
            return deleteElementAtIndex(current, index);
          });
        });

        setIsRequesting(true);

        setRequests((current) => {
          return [...current, targetUser.id];
        });
      }}
      className="unblock"
    >
      Unblock
    </button>
  ) : (
    <Loader isLoading={true} />
  );
}
