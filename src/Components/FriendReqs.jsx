import Button from "./Button";
import Image from "./Image";
import Skeleton from "react-loading-skeleton";

/*
  handleChangeData,
  handleAcceptFriend,
  handleDeclineFriend,
*/
export default function FriendReqs({
  activeUser,
  allUser,
}) {
  // Get all the friend user objects.
  const friendRequests =
    activeUser?.friendRequest?.map(
      (reqId) => allUser[reqId]
    ) || new Array(2).fill("LOADING");

  const props = {
    allUser,
    activeUser,
    // handleChangeData,
    // handleAcceptFriend,
    // handleDeclineFriend,
  };

  return (
    <div className="friend-reqs">
      <h2 className="title">REQUEST</h2>
      {/* Placeholder if user has no friend request */}
      {friendRequests?.length === 0 ? (
        <div className="req placeholder">
          YOU HAVE NO REQUEST
        </div>
      ) : null}
      {friendRequests?.map((user, i) => (
        <Request
          key={`feeds-friendreq-${i}`}
          user={user}
          isLoading={user === "LOADING"}
          {...props}
        />
      ))}
    </div>
  );
}

function Request({
  user,
  // handleAcceptFriend,
  // handleDecline,
  isLoading = false,
}) {
  return (
    <article className="req">
      {isLoading ? (
        <Skeleton height={"100px"} />
      ) : (
        <>
          <header>
            <div className="pfp">
              <Image
                className={"friendReq-pfp"}
                link={user.pfp}
                key={`${user.pfp}-friendReq`}
                alt={`${user.username}'s Profile Picture`}
              />
            </div>
            <p>
              <span className="name">{user.username}</span>
              wants to be friends with you
            </p>
          </header>
          <div className="buttons">
            <Button
              padding="0.6rem 0rem"
              type="primary"
              buttonText="Accept"
              width="100%"
              // onClick={() => handleAcceptFriend(user)}
            />
            <Button
              padding="0.6rem 0rem"
              type="secondary"
              buttonText="Decline"
              width="100%"
              // onClick={() => handleDecline(user)}
            />
          </div>{" "}
        </>
      )}
    </article>
  );
}
