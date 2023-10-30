import Button from "./Button";
import Image from "./Image";

export default function FriendReqs({
  activeUserObject: activeUser,
  allUser,
  handleChangeData,
  handleAcceptFriend,
  handleDeclineFriend,
}) {
  // Get all the friend user objects.
  const friendRequests = activeUser.data.friendRequest?.map(
    (reqId) => allUser.find((user) => user.id === reqId)
  );

  const props = {
    allUser,
    activeUser,
    handleChangeData,
    handleAcceptFriend,
    handleDeclineFriend,
  };

  return (
    <div className="friend-reqs">
      <h2 className="title">REQUEST</h2>
      {/* Placeholder if user has no friend request */}
      {friendRequests.length === 0 ? (
        <div className="req placeholder">
          YOU HAVE NO REQUEST
        </div>
      ) : null}
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

function Request({
  user,
  handleAcceptFriend,
  handleDecline,
}) {
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
          onClick={() => handleAcceptFriend(user)}
        />
        <Button
          padding="0.6rem 0rem"
          type="secondary"
          buttonText="Decline"
          width="100%"
          onClick={() => handleDecline(user)}
        />
      </div>
    </article>
  );
}
