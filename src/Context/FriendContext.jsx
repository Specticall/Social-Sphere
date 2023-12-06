import { createContext, useContext, useEffect, useReducer } from "react";
import {
  createFieldPlaceholder,
  deleteElementAtIndex,
  filterFieldbyId,
} from "../Helper/helper";
import { useApp } from "./AppContext";
import {
  handleAcceptFriend,
  handleCancelRequestFriend,
  handleDeclineFriend,
  handleUnblockFriend,
} from "../Helper/model_friend";

const FriendContext = createContext(null);

const initialState = {
  status: "loading",
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

export function FriendProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeUser, allUser, globalDispatch } = useApp();

  // Wait for friend data.
  useEffect(() => {
    if (!activeUser) return;
    const friends = filterFieldbyId(allUser, activeUser.friends);

    dispatch({ type: "get_friends", payload: friends });
  }, [allUser, activeUser?.friends, activeUser]);

  /**
   * Handles friend list manipulation task
   * @param {String} type - "accept", "decline", "unblock"
   * @param {Object} targetUser  - "target user object"
   */
  const handleAction = (type, targetUser) => {
    const stateSetter = () => {
      globalDispatch({ type: "refetch_data" });
      dispatch({ type: "remove_request", payload: targetUser.id });
    };
    const dependencies = [activeUser, targetUser, stateSetter];

    if (type === "accept") handleAcceptFriend(...dependencies);
    if (type === "decline") handleDeclineFriend(...dependencies);
    if (type === "unblock") handleUnblockFriend(...dependencies);
    if (type === "cancel") handleCancelRequestFriend(...dependencies);

    dispatch({ type: "add_request", payload: targetUser.id });
  };

  return (
    <FriendContext.Provider value={{ state, dispatch, handleAction }}>
      {children}
    </FriendContext.Provider>
  );
}

export function useFriends() {
  const context = useContext(FriendContext);
  if (!context)
    throw new Error(
      "Friend Context must be used inside of its provider's scope"
    );
  return context;
}
