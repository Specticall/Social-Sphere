import { v4 as uuidv4 } from "uuid";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useApp } from "./AppContext";
import { getData, putData } from "../db/backend";
import { isEmptyObject } from "../Helper/helper";
import { useLocation } from "react-router-dom";

const ChatroomContext = createContext();

const initialState = {
  status: "loading",
  activeUserChatLog: {},
  targetUserChatId: "",
  targetUserObject: {},
  chatSent: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "load_chat":
      return {
        ...state,
        activeUserChatLog: action.payload.data,
        targetUserChatId: action.payload.targetUserChatId,
        targetUserObject: action.payload.targetUserObject,
        status: "ready",
        chatSent: 0,
      };
    case "chat_not_found": {
      const newChat = {
        id: uuidv4(),
        user: [action.payload.activeUser.id, action.payload.targetUserChatId],
        chatLog: [],
      };
      return {
        ...state,
        status: "empty",
        activeUserChatLog: newChat,
        targetUserChatId: action.payload.targetUserChatId,
        targetUserObject: action.payload.targetUserObject,
        chatSent: 0,
      };
    }

    case "send_chat": {
      return {
        ...state,
        chatSent: state.chatSent + 1,
        activeUserChatLog: {
          ...state.activeUserChatLog,
          state: "ready",
          chatLog: [...state.activeUserChatLog.chatLog, action.payload],
        },
      };
    }
    case "change_chat_target":
      return {
        ...state,
        status: "loading",
        targetUserChatId: action.payload,
      };
    default:
      throw new Error("Reducer type not specified");
  }
}

export function ChatroomProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [test, setTest] = useState("111");
  const { activeUser, allUser, globalDispatch } = useApp();
  const chatBoxEl = useRef(null);
  const location = useLocation();

  // Caches data so that when the component unmouts the cleanup function
  // can send the reducer state to the database.
  const stateCache = useRef(null);

  /*
    Everytime there's a chat, increment the corresponding counter of a value on the 
    TARGET USER object called "unreadChat" which keeps track the amount of 
    unread message the target user has at the moment.
    unreadChat : [{chatId : "...", count: "..."}]
  */
  const saveUnreadChatCount = (state) => {
    const targetUser = state.targetUserObject;

    // 1. Create the user data
    const newData = {
      ...targetUser,
      unreadChat: {
        ...(targetUser.unreadChat || {}),
        [activeUser.id]:
          (targetUser.unreadChat?.[activeUser.id] || 0) + state.chatSent,
      },
    };

    //2. Upload the data
    const sendData = async () => {
      await putData("www.mockdb/put/user", newData, targetUser.id);
      globalDispatch({ type: "refetch_data" });
      // console.log(res, targetUser.id);
      // console.log(newData);
    };
    sendData();
  };

  /*
    Sets the user unread chat count of the target user to 0.
  */
  const clearUnreadChatCount = (state) => {
    // Only run the when app is inside chatroom;
    const newData = {
      ...activeUser,
      unreadChat: { ...activeUser.unreadChat, [state.targetUserChatId]: 0 },
    };
    const sendData = async () => {
      await putData("www.mockdb/put/user", newData, activeUser.id);
      // console.log(res);
      // console.log(newData);
    };
    sendData();
  };

  useEffect(() => {
    stateCache.current = state;
  }, [state]);

  useEffect(() => {
    if (!activeUser || !location.pathname.includes("/chatroom")) return;
    const getChatData = async () => {
      const chatTargetId = state.targetUserChatId || activeUser.friends[0];
      try {
        const data = await getData(
          `www.mockdb/chat_log?=${activeUser.id}/${chatTargetId}`
        );
        if (!data) throw new Error("Oops! Fetching chat went wrong");
        dispatch({
          type: "load_chat",
          payload: {
            data,
            targetUserChatId: chatTargetId,
            targetUserObject: allUser[chatTargetId],
          },
        });

        clearUnreadChatCount(state);
      } catch (error) {
        dispatch({
          type: "chat_not_found",
          payload: {
            targetUserChatId: chatTargetId,
            targetUserObject: allUser[chatTargetId],
            activeUser,
          },
        });
      }
    };

    if (state.status === "loading") getChatData();

    // Send data after closing chat
    // TEMP : Real world apps does not work like this.
    return () => {
      const newChatLogCache = stateCache.current.activeUserChatLog;
      if (
        isEmptyObject(newChatLogCache) ||
        stateCache.current.status === "loading"
      )
        return;
      // console.log(newChatLogCache);

      putData(
        "www.mockdb/put/chat-update",
        newChatLogCache,
        newChatLogCache.id
      );

      saveUnreadChatCount(stateCache.current);
    };
  }, [activeUser, state.targetUserChatId, state.status]);

  const handleChangeTarget = (targetId) => {
    dispatch({ type: "change_chat_target", payload: targetId });
  };

  return (
    <ChatroomContext.Provider
      value={{
        state,
        dispatch,
        activeUser,
        chatBoxEl,
        handleChangeTarget,
        test,
        setTest,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  );
}

export function useChatroom() {
  const context = useContext(ChatroomContext);
  if (!context)
    throw new Error("Chatroom context is used outside of its provider's scope");
  return context;
}
