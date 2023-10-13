import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { storyImage } from "../Data/storydata";
import { recommendationData } from "../Data/recommendationData";
import Button from "../Components/Button";

register();

export default function Feeds({
  activeUser,
  userData,
  setActivePage,
  activePage,
}) {
  const props = {
    activeUser,
    userData,
    setActivePage,
    activePage,
  };

  return (
    <div className="page__feeds">
      <div className="left">left</div>
      <div className="middle">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Who are you looking for?"
          />
          <i className="bx bx-search-alt-2"></i>
        </div>
        <div className="slider-container">
          <Slider />
        </div>
        <h2 className="recommendation__title">
          People you might like
        </h2>
        <div className="recommendation">
          {recommendationData.map((data, i) => (
            <Recommendation {...data} key={data.user + i} />
          ))}
        </div>
      </div>
      <div className="right">
        <UserProfile />
      </div>
    </div>
  );
}

function Recommendation({
  user,
  pfpUrl,
  tag,
  caption,
  imagesID,
}) {
  return (
    <article className="feeds__recommendation">
      <div className="info">
        <img
          className="profile-picture"
          src={`https://source.unsplash.com/${pfpUrl}`}
          alt="pfp"
        />
        <div className="profile">
          <h3>{user}</h3>
          <p>{tag}</p>
        </div>
        <Button type="primary" buttonText="Contact" />
      </div>
      <p className="caption">{caption}</p>
      <div className="images">
        {imagesID.map((IMG_URL, i) => (
          <img
            src={`https://source.unsplash.com/${IMG_URL}`}
            className={`img-${i}`}
            alt="feeds image"
            key={`${IMG_URL}-${i}`}
          />
        ))}
      </div>
    </article>
  );
}

function Slider() {
  const swiperElRef = useRef(null);

  useEffect(() => {});

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="4"
      space-between="15"
      bulletClass="story-pagination"
      delay="3000"
      disableOnInteraction="true"
    >
      {storyImage.map((story) => (
        <swiper-slide key={story.id}>
          <StoryCards {...story} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
}

function StoryCards({ image: IMG_URL, caption, poster }) {
  return (
    <div className="story-cards">
      <img
        src={`https://source.unsplash.com/${IMG_URL}`}
        alt="story image"
      />
      <summary>
        <div className="truncate">{caption}</div>
        <p>{poster}</p>
      </summary>
    </div>
  );
}

function UserProfile() {
  return (
    <article className="user-profile">
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
            by day, photographer by night, weaving code and
            taste into my digital world.&quot;
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
  );
}
