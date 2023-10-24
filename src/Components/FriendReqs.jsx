import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import Image from "./Image";

export default function FriendReqs({
  activeUserObject: activeUser,
  allUser,
  handleChangeData,
}) {
  // Get all the friend user objects.
  const friendRequests = activeUser.data.friendRequest?.map(
    (reqId) => allUser.find((user) => user.id === reqId)
  );

  const props = {
    allUser,
    activeUser,
    handleChangeData,
  };

  return (
    <div className="friend-reqs">
      <h2 className="title">REQUEST</h2>
      {friendRequests.map((user, i) => (
        <Request
          key={`${user.data.username}-${i}`}
          user={user}
          {...props}
        />
      ))}
    </div>
  );
}

function Request({ user, handleChangeData, activeUser }) {
  const handleAccept = () => {
    const newFriendsList = [
      ...activeUser.data.friends,
      user.id,
    ];

    handleChangeData({
      type: "addFriend",
      newData: newFriendsList,
      changeTargetId: activeUser.id,
    });
  };

  const handleDecline = () => {};

  return (
    <article className="req">
      <header>
        <div className="pfp">
          <Image
            className={"friendReq-pfp"}
            link={user.data.pfp}
            key={`${user.data.pfp}-friendReq`}
            alt={`${user.data.username}'s Profile Picture`}
          />
        </div>
        <p>
          <span className="name">{user.data.username}</span>
          wants to be friends with you
        </p>
      </header>
      <div className="buttons">
        <Button
          padding="0.6rem 0rem"
          type="primary"
          buttonText="Accept"
          width="100%"
          onClick={handleAccept}
        />
        <Button
          padding="0.6rem 0rem"
          type="secondary"
          buttonText="Decline"
          width="100%"
          onClick={handleDecline}
        />
      </div>
    </article>
  );
}
