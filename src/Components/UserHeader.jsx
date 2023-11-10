import Skeleton from "react-loading-skeleton";
import Image from "./Image";

function UserHeader({ imageSource, username, tag, isOnline, height = "5rem" }) {
  console.log(imageSource);
  return (
    <div className="user-header">
      <div className="profile">
        <Image
          isUnsplashURL={true}
          link={imageSource}
          isCircle={true}
          alt="profile-picture"
          className="pfp"
          defaultStyle={false}
          style={{ height }}
        />
        <div
          className="online-indicator"
          style={{
            width: `${parseFloat(height) * 0.275}rem`,
            background: isOnline ? "var(--clr-green)" : "var(--clr-red)",
          }}
        ></div>
      </div>

      <div className="info">
        <p className="username">{username}</p>
        <p className="tag">{tag}</p>
      </div>
    </div>
  );
}

export default UserHeader;
