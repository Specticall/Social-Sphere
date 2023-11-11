import { deleteElementAtIndex } from "../Helper/helper";
import {
  handleAcceptFriend,
  handleDeclineFriend,
} from "../Helper/model_friend";
import Button from "./Button";
import Image from "./Image";
import Skeleton from "react-loading-skeleton";
import { Loader } from "./Loader";
import { useState } from "react";

/*
  handleChangeData,
  handleAcceptFriend,
  handleDeclineFriend,
*/
export default function FriendReqs({
  activeUser,
  allUser,
  globalDispatch,
  globalState,
}) {
  const [requests, setRequests] = useState([]);
  // Get all the friend user objects.
  const friendRequests =
    activeUser?.friendRequest?.map((reqId) => allUser[reqId]) ||
    new Array(2).fill("LOADING");

  const props = {
    allUser,
    activeUser,
    requests,
    setRequests,
  };

  return (
    <div className="friend-reqs">
      <h2 className="title">REQUEST</h2>
      {/* Placeholder if user has no friend request */}
      {friendRequests?.length === 0 ? (
        <div className="req placeholder">YOU HAVE NO REQUEST</div>
      ) : null}
      {friendRequests?.map((user) => (
        <Request
          key={user.id}
          user={user}
          isLoading={user === "LOADING"}
          {...props}
        />
      ))}
    </div>
  );
}

function Request({
  user: targetUser,
  setRequests,
  requests,
  isLoading = false,
  activeUser,
  globalDispatch,
  globalState,
}) {
  const [isRequesting, setIsRequesting] = useState(
    requests.includes(targetUser?.id) ? true : false
  );

  const handleAction = (type) => () => {
    if (isRequesting) return;

    const stateSetter = () => {
      setRequests((current) => {
        const index = current.indexOf(targetUser.id);
        return deleteElementAtIndex(current, index);
      });

      globalDispatch({ type: "refetch_data" });
    };
    const dependencies = [activeUser, targetUser.id, stateSetter];

    if (type === "accept") handleAcceptFriend(...dependencies);
    if (type === "decline") handleDeclineFriend(...dependencies);

    setIsRequesting(true);

    setRequests((current) => {
      return [...current, targetUser.id];
    });
  };

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
                link={targetUser.pfp}
                key={`${targetUser.pfp}-friendReq`}
                alt={`${targetUser.username}'s Profile Picture`}
              />
            </div>
            <p>
              <span className="name">{targetUser.username}</span>
              wants to be friends with you
            </p>
          </header>
          <div className="buttons">
            {isRequesting ? (
              <Loader isLoading={true} />
            ) : (
              <>
                <Button
                  padding="0.6rem 0rem"
                  type="primary"
                  buttonText="Accept"
                  width="100%"
                  onClick={handleAction("accept")}
                />
                <Button
                  padding="0.6rem 0rem"
                  type="secondary"
                  buttonText="Decline"
                  width="100%"
                  onClick={handleAction("decline")}
                />
              </>
            )}
          </div>
        </>
      )}
    </article>
  );
}
