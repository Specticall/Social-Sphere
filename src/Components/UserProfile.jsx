import { useEffect, useRef, useState } from "react";

export default function UserProfile({
  openProfile,
  setOpenProfile,
  isMobile,
  activeUser,
  setActivePage,
  setActiveUser,
  setActiveUserId,
}) {
  const profileEl = useRef(null);

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

    return () =>
      document.removeEventListener("click", closeProfile);
  }, [setOpenProfile, openProfile, isMobile]);

  // DATA deconstruct needed data from active user.
  const { data: user } = activeUser;

  // Function that handles logout
  const onLogout = () => {
    setActivePage("login");
    setActiveUserId("");
  };

  return (
    <div className="user-profile__container">
      <article
        className="user-profile"
        ref={profileEl}
        style={
          isMobile
            ? {
                transform: `translate(${
                  openProfile ? 0 : 100
                }%, 0%)`,
              }
            : null
        }
      >
        <div className="background"></div>
        <div className="user-profile__wrapper">
          <button
            className="user-profile__logout-btn"
            onClick={onLogout}
          >
            <i className="bx bx-log-out"></i>
            Log out
          </button>
          <div className="user-profile__pfp"></div>
          <h2>{user.username}</h2>
          <p className="user-profile__profession">
            {user.occupation}
          </p>
          <p className="user-profile__tag">{user.tag}</p>
          <article className="user-profile__about-me">
            <h3>About me</h3>
            <p>{user.aboutMe}</p>
          </article>
          <article className="user-profile__status">
            <h3>Status</h3>
            <ul className="status-list">
              <li>
                <i className="bx bx-map"></i>
                {user.status.city}, {user.status.country}
              </li>
              <li>
                <i className="bx bx-user"></i>
                {user.status.activity}
              </li>
              <li>
                <i className="bx bx-heart"></i>
                {user.status.loveStatus}
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                {user.status.age} Years old
              </li>
            </ul>
          </article>
        </div>
      </article>
    </div>
  );
}
