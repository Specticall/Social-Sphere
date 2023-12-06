import Skeleton from "react-loading-skeleton";
import { useApp } from "../Context/AppContext";
import UserHeader from "./UserHeader";
import { filterFieldbyId } from "../Helper/helper";
import { useChatroom } from "../Context/ChatroomContext";

function ChatroomNav() {
  const { activeUser, allUser } = useApp();
  const { handleChangeTarget, state } = useChatroom();

  if (!activeUser) return <Skeleton />;

  const friendObjects = filterFieldbyId(allUser, activeUser.friends);
  const friendUnreadChat = activeUser.unreadChat || {};

  return (
    <>
      <p className="chatroom-nav__indicator">
        Friends ({activeUser.friends.length})
      </p>
      <ul className="chatroom-nav">
        {friendObjects.map((user) => {
          return (
            <li
              key={`${user.id}-chatroom-nav}`}
              className={`chatroom-nav__item ${
                state.targetUserChatId === user.id ? "active" : ""
              }`}
              onClick={() => {
                handleChangeTarget(user.id);
              }}
            >
              <UserHeader
                imageSource={user.pfp}
                username={user.username}
                tag={user.tag}
                isOnline={user.isOnline}
                height={"3rem"}
              />
              <UnreadChats>
                {state.targetUserChatId === user.id
                  ? 0
                  : friendUnreadChat[user.id] || 0}
              </UnreadChats>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function UnreadChats({ children }) {
  return (
    <div className={`unread-chats ${children === 0 ? "empty" : ""}`}>
      {children}
    </div>
  );
}

export default ChatroomNav;
