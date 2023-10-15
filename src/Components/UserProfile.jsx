import { useEffect, useRef, useState } from "react";

export default function UserProfile({
  openProfile,
  setOpenProfile,
  isMobile,
}) {
  const profileEl = useRef(null);

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
          <button className="user-profile__logout-btn">
            <i className="bx bx-log-out"></i>
            Log out
          </button>
          <div className="user-profile__pfp"></div>
          <h2>Sarah Wilson</h2>
          <p className="user-profile__profession">
            Software Engineer
          </p>
          <p className="user-profile__tag">@sarahwls</p>
          <article className="user-profile__about-me">
            <h3>About me</h3>
            <p>
              &quot;Hi, I&apos;m Sarah – a software engineer
              by day, photographer by night, weaving code
              and taste into my digital world.&quot;
            </p>
          </article>
          <article className="user-profile__status">
            <h3>Status</h3>
            <ul className="status-list">
              <li>
                <i className="bx bx-map"></i>
                Jakarta, Indonesia
              </li>
              <li>
                <i className="bx bx-user"></i>
                Undergrad, Student
              </li>
              <li>
                <i className="bx bx-heart"></i>
                Single
              </li>
              <li>
                <i className="bx bx-calendar"></i>
                21 Years old
              </li>
            </ul>
          </article>
        </div>
      </article>
    </div>
  );
}
