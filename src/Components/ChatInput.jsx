import { useEffect, useState } from "react";
import { useApp } from "../Context/AppContext";
import { useChatroom } from "../Context/ChatroomContext";

function ChatInput() {
  const { activeUser } = useApp();
  const { dispatch, state } = useChatroom();
  const [query, setQuery] = useState("");

  // useEffect(() => {}, [state.activeUserChatLog]);

  const handleNewChat = (e) => {
    e.preventDefault();

    const newChat = {
      user: activeUser.id,
      timestamp: Date.now(),
      message: query,
    };

    setQuery("");

    dispatch({ type: "send_chat", payload: newChat });
  };

  return (
    <form className="chat-input" onSubmit={handleNewChat}>
      <div className="attach">
        <i className="bx bx-paperclip"></i>
      </div>
      <input
        type="text"
        className="text-input"
        placeholder="Enter Message..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className="send-text">
        <i className="bx bxs-send"></i>
      </button>
    </form>
  );
}

export default ChatInput;
