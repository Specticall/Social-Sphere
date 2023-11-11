import { useEffect } from "react";
import ChatBubble from "./ChatBubble";
import Skeleton from "react-loading-skeleton";

function Chatbox({ state, dispatch, activeUser, chatBoxEl }) {
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
      )}
    </div>
  );
}

export default Chatbox;
