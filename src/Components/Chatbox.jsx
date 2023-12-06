import { useEffect } from "react";
import ChatBubble from "./ChatBubble";
import Skeleton from "react-loading-skeleton";
import { useChatroom } from "../Context/ChatroomContext";
import { useApp } from "../Context/AppContext";

function Chatbox() {
  const { state, chatBoxEl } = useChatroom();
  // Scroll to bottom after chat is created
  useEffect(() => {
    chatBoxEl.current.scroll({
      top: chatBoxEl.current.scrollHeight,
      behavior: "smooth",
    });
  }, [state.activeUserChatLog, chatBoxEl, state.status]);

  return (
    <div className="chatbox" ref={chatBoxEl}>
      {state.status === "loading" ? (
        <Skeleton
          containerClassName="skeleton skeleton__full-h"
          height={"100%"}
        />
      ) : (
        <Chats />
      )}
    </div>
  );
}

function Chats() {
  const { state } = useChatroom();
  const { activeUser } = useApp();

  if (state.activeUserChatLog.chatLog.length === 0)
    return (
      <div className="wrapper">
        <p className="empty-chat">Start Chatting!</p>
      </div>
    );

  return (
    <div className="wrapper">
      {state.activeUserChatLog?.chatLog?.map(
        ({ user, timestamp, message }, i, log) => {
          const type = activeUser.id === user ? "user" : "friend";
          // Determine the first of a consecutive sets of messages.
          const isFirst = i === 0 ? false : log[i - 1]?.user !== user;

          return (
            <ChatBubble
              type={type}
              key={`${user}${timestamp}${i}`}
              isFirst={isFirst}
              message={message}
            />
          );
        }
      )}
    </div>
  );
}

export default Chatbox;
