import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { storyImage } from "../Data/storydata";
import { recommendationData } from "../Data/recommendationData";

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
      <div className="right">right</div>
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
        <button>Contact</button>
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

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="4"
      space-between="15"
      bulletClass="story-pagination"
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
