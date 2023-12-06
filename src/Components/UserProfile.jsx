import { useEffect, useRef, useState } from "react";
import Image from "./Image";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useApp } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import UserStatus from "./UserStatus";

export default function UserProfile({ openProfile, setOpenProfile }) {
  const { isMobile, activeUser, setActiveUserId, globalDispatch } = useApp();

  const profileEl = useRef(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(activeUser ? false : true);

  useEffect(() => {
    setIsLoading(activeUser ? false : true);
  }, [activeUser]);

  /*
  Effect to open / close MOBILE profile by pressing
  outside the profile popup itself
  */
  useEffect(() => {
    const closeProfile = (e) => {
      if (
        !e.target.closest(".user-profile") &&
        !e.target.closest(".pfp-button")
      )
        setOpenProfile(false);
    };

    document.addEventListener("click", closeProfile);

    return () => document.removeEventListener("click", closeProfile);
  }, [setOpenProfile, openProfile, isMobile]);

  // DATA deconstruct needed data from active user.
  const user = activeUser;

  // Function that handles logout
  const onLogout = () => {
    // setActivePage("login");
    globalDispatch({ type: "switch_page", payload: "login" });
    setActiveUserId("");
    navigate("/login");
  };

  const props = {
    user,
    isLoading,
  };

  return (
    <div className="user-profile__container">
      <article
        className="user-profile"
        ref={profileEl}
        style={
          isMobile
            ? {
                transform: `translate(${openProfile ? 0 : 100}%, 0%)`,
              }
            : null
        }
      >
        <div className="background"></div>
        <div className="user-profile__wrapper">
          <button className="user-profile__logout-btn" onClick={onLogout}>
            <i className="bx bx-log-out"></i>
            Log out
          </button>
          <UserPfp {...props} />
          <UserHeading {...props} />
          <UserAboutMe {...props} />
          <UserStatus {...props} />
        </div>
      </article>
    </div>
  );
}

function UserPfp({ user, isLoading }) {
  return (
    <div className="user-profile__pfp">
      <Image
        isVisible={!isLoading}
        link={user?.pfp}
        alt="logged in user profile picture"
      />
      {isLoading && (
        <Skeleton
          containerClassName="skeleton skeleton__full-h skeleton__circle"
          height={"100%"}
          borderRadius={"100%"}
        />
      )}
      <div className="online-indicator"></div>
    </div>
  );
}

function UserHeading({ user }) {
  return (
    <>
      <h2>
        {user?.username || (
          <Skeleton
            containerClassName="skeleton"
            width={"150px"}
            height={"30px"}
          />
        )}
      </h2>
      <p className="user-profile__profession">
        {user?.occupation || (
          <Skeleton
            containerClassName="skeleton"
            width={"140px"}
            height={"20px"}
          />
        )}
      </p>
      <p className="user-profile__tag">
        {user?.tag || (
          <Skeleton
            containerClassName="skeleton"
            width={"90px"}
            height={"20px"}
          />
        )}
      </p>
    </>
  );
}

function UserAboutMe({ user }) {
  return (
    <article className="user-profile__about-me">
      <h3>About me</h3>
      <p>
        {user?.aboutMe || (
          <Skeleton
            containerClassName="skeleton__about-me skeleton"
            height={"20px"}
            count={3}
          />
        )}
      </p>
    </article>
  );
}
