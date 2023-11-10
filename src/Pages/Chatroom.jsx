import ChatInput from "../Components/ChatInput";
import Chatbox from "../Components/Chatbox";
import FriendUtils from "../Components/FriendUtils";
import ProfilePicture from "../Components/ProfilePicture";
import UserHeader from "../Components/UserHeader";

function Chatroom({ activeUser }) {
  return (
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
        <Chatbox />
        <ChatInput />
      </div>
    </div>
  );
}

export default Chatroom;
