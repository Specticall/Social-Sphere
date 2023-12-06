import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../Context/AppContext";
import UserStatus from "../Components/UserStatus";
import Image from "../Components/Image";
import Button from "../Components/Button";
import { Loader } from "../Components/Loader";
import {
  handleAcceptFriend,
  handleAddRequestFriend,
  handleDeclineFriend,
} from "../Helper/model_friend";
import {
  UserHomepageProvider,
  useUserHomepage,
} from "../Context/UserHomepageContext";

function getStatus(activeUser, userId) {
  if (activeUser.friends.includes(userId)) return "friend";
  if (activeUser.friendRequest.includes(userId)) return "pending";
  if (activeUser.outgoingRequest.includes(userId)) return "requested";
  return "unknown";
}

function UserHomepage() {
  return (
    <UserHomepageProvider>
      <Content />
    </UserHomepageProvider>
  );
}

function Content() {
  const { selectedUser, isLoading } = useUserHomepage();

  if (isLoading)
    return (
      <div className="user-homepage">
        <div className="wrapper">
          <Loader className={"user-homepage__loader"} />
        </div>
      </div>
    );

  return (
    <div className="user-homepage">
      <Link to={"../feeds"} className="back-button">
        <i className="bx bx-arrow-back"></i>
      </Link>

      <div className="wrapper">
        <div className="image">
          <Image link={selectedUser.pfp} className="image__main" />
          <div className="image__background"></div>
        </div>
        <UserInfo />
      </div>
    </div>
  );
}

function UserInfo() {
  const { selectedUser, isLoading, activeUser, userId } = useUserHomepage();

  // status : "pending" / "friend" / "unknown"
  const status = getStatus(activeUser, userId);
  return (
    <div className="info">
      <p className="tag">{selectedUser.tag}</p>

      <h2 className="username">
        {selectedUser.username}
        {status === "friend" && <span>Friend</span>}
        {status === "requested" && <span className="gray">Requested</span>}
        {status === "pending" && <span className="gray">Pending</span>}
      </h2>

      <p className="about-me">About Me</p>
      <p className="about-me__content">{selectedUser.aboutMe}</p>

      <UserStatus
        user={selectedUser}
        isLoading={isLoading}
        className={"user-status"}
      />

      <div className="cta">
        {status === "unknown" && <UnknownFriendsButton />}
        {status === "requested" && <RequestedFriendButtons />}
        {status === "pending" && <PendingFriendButtons />}
        {status === "friend" && <KnownFriendButtons />}
      </div>
    </div>
  );
}

function UnknownFriendsButton() {
  const { activeUser, allUser, globalDispatch } = useApp();
  const { userId } = useUserHomepage();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = () => {
    setIsLoading(true);
    const stateSetter = () => {
      globalDispatch({ type: "refetch_data" });
    };
    const dependencies = [activeUser, allUser[userId], stateSetter];
    handleAddRequestFriend(...dependencies);
  };

  if (isLoading) return <Loader className={"user-homepage__loader"} />;
  return (
    <>
      <Button
        buttonText={""}
        className="btn__main"
        width=""
        onClick={handleAction}
      >
        Request Friend
      </Button>
    </>
  );
}

function RequestedFriendButtons() {
  return (
    <>
      <Button buttonText={""} className="btn__main" width="" type="secondary">
        Cancel Request
      </Button>
    </>
  );
}

function PendingFriendButtons() {
  const { activeUser, allUser, globalDispatch } = useApp();
  const { userId } = useUserHomepage();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = (type) => () => {
    setIsLoading(true);
    const stateSetter = () => {
      globalDispatch({ type: "refetch_data" });
    };

    const dependencies = [activeUser, allUser[userId], stateSetter];
    if (type === "accept") handleAcceptFriend(...dependencies);
    if (type === "decline") handleDeclineFriend(...dependencies);
  };
  if (isLoading) return <Loader className={"user-homepage__loader"} />;
  return (
    <>
      <Button
        buttonText={""}
        className="btn__main"
        width=""
        onClick={handleAction("accept")}
      >
        Accept Request
      </Button>
      <Button
        buttonText={""}
        className="btn__main"
        width=""
        type="secondary"
        onClick={handleAction("decline")}
      >
        Decline Request
      </Button>
    </>
  );
}

function KnownFriendButtons() {
  return (
    <>
      <Button type={"secondary"} className="btn__icon" width="">
        <i className="bx bx-phone"></i>
      </Button>
      <Button type={"secondary"} className="btn__icon" width="">
        <i className="bx bx-chat"></i>
      </Button>
    </>
  );
}

export default UserHomepage;
