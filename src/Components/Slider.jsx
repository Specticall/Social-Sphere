import { useEffect, useRef } from "react";
import { storyImage } from "../Data/storydata";
import { Autoplay } from "swiper/modules";
import { register } from "swiper/element/bundle";

export function Slider() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    register();
    // swiperElRef.current
    const options = {
      breakpoints: {
        1300: {
          slidesPerView: 5,
        },
        500: {
          slidesPerView: 3,
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperElRef.current, options);

    // and now initialize it
    swiperElRef.current.initialize();
  }, []);

  return (
    <div className="slider-container">
      <swiper-container
        class="swiper-container"
        ref={swiperElRef}
        init="false"
        slides-per-view="2"
        space-between="15"
        bulletClass="story-pagination"
        disableOnInteraction="true"
        autoplay-delay="4000"
        autoplay-disable-on-interaction="false"
        autoplay-pause-on-mouse-enter="true"
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
