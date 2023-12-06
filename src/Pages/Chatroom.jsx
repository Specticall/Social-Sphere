import Skeleton from "react-loading-skeleton";
import ChatInput from "../Components/ChatInput";
import Chatbox from "../Components/Chatbox";
import FriendUtils from "../Components/FriendUtils";
import UserHeader from "../Components/UserHeader";
import { useChatroom } from "../Context/ChatroomContext";

function Chatroom() {
  return (
    <main>
      <div className="chatroom">
        <div className="nav-placeholder"></div>

        <div className="chat">
          <ChatHeader />
          <Chatbox />
          <ChatInput />
        </div>
      </div>
    </main>
  );
}

function ChatHeader() {
  const { state } = useChatroom();

  if (state.status === "loading") return <Skeleton height={"6rem"} />;

  return (
    <header>
      <UserHeader
        username={state.targetUserObject.username}
        tag={state.targetUserObject.tag}
        imageSource={state.targetUserObject.pfp}
        isOnline={state.targetUserObject.isOnline}
        height="3.75rem"
      />
      <FriendUtils />
    </header>
  );
}

export default Chatroom;
