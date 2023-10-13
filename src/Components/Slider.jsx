import { useEffect, useRef } from "react";
import { storyImage } from "../Data/storydata";

export function Slider() {
  const swiperElRef = useRef(null);

  useEffect(() => {});

  return (
    <div className="slider-container">
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
    </div>
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
