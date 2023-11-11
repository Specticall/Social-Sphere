import UserHeader from "./UserHeader";

function ChatroomNav({ activeUser }) {
  return (
    <ul className="chatroom-nav">
      {activeUser?.friends.map((user) => {
        return (
          <li key={`${user.id}-chatroom-nav}`}>
            <UserHeader
              imageSource={user.pfp}
              username={user.username}
              tag={user.tag}
              isOnline={user.isOnline}
              height={"3rem"}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ChatroomNav;
