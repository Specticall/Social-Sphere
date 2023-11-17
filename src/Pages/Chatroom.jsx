import { useEffect, useReducer, useRef } from "react";
import ChatInput from "../Components/ChatInput";
import Chatbox from "../Components/Chatbox";
import FriendUtils from "../Components/FriendUtils";
import UserHeader from "../Components/UserHeader";
import { getData, putData } from "../db/backend";

const initialState = {
  status: "loading",
  activeUserChatLog: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "load_chat":
      return {
        ...state,
        activeUserChatLog: action.payload,
        status: "ready",
      };

    case "send_chat":
      return {
        ...state,
        activeUserChatLog: {
          ...state.activeUserChatLog,
          chatLog: [...state.activeUserChatLog.chatLog, action.payload],
        },
      };
    default:
      throw new Error("Reducer type not specified");
  }
}

function Chatroom({ activeUser }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const chatBoxEl = useRef(null);

  // Caches data so that when the component unmouts the cleanup function
  // can send the reducer state to the database.
  const newChatLogCache = useRef(null);

  useEffect(() => {
    newChatLogCache.current = state.activeUserChatLog;
  }, [state?.activeUserChatLog]);

  useEffect(() => {
    if (!activeUser) return;
    const getChatData = async () => {
      try {
        const data = await getData("www.mockdb/chat_log?=AAA01/AAA05");
        if (!data) throw new Error("Oops! Fetching chat went wrong");

        dispatch({ type: "load_chat", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };

    getChatData();

    // Send data after closing chat
    // TEMP : Real world apps does not work like this.
    return () => {
      if (JSON.stringify(newChatLogCache.current) === "{}") return;
      putData(
        "www.mockdb/put/chat-update",
        newChatLogCache.current.chatLog,
        newChatLogCache.current.id
      );
    };
  }, [activeUser]);

  const props = {
    state,
    dispatch,
    activeUser,
    chatBoxEl,
  };

  return (
    <main>
      <div className="chatroom">
        <div className="nav-placeholder"></div>

        <div className="chat">
          <header>
            <UserHeader
              username={activeUser?.username}
              tag={activeUser?.tag}
              imageSource={activeUser?.pfp}
              isOnline={true}
              height="3.75rem"
            />
            <FriendUtils />
          </header>
          <Chatbox {...props} />
          <ChatInput {...props} />
        </div>
      </div>
    </main>
  );
}

export default Chatroom;
