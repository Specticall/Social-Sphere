import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Skeleton from "react-loading-skeleton";

export function Slider({ items }) {
  const swiperElRef = useRef(null);
  const [isLoading, setIsLoading] = useState(
    items ? false : true
  );

  useEffect(() => {
    setIsLoading(items ? false : true);
  }, [items]);

  // if items is undefined then the data is still fetching
  // So we create an array with a length of 6 containing a string "loading"
  const data = items || new Array(6).fill("loading");

  // SwiperJS Configs
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
  }, [items]);

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
        {data.map(
          ({ storyImage, storyDescription, tag }, i) => (
            <swiper-slide key={`${storyImage}-${i}`}>
              <StoryCards
                storyImage={storyImage}
                storyDescription={storyDescription}
                tag={tag}
                isLoading={isLoading}
              />
            </swiper-slide>
          )
        )}
      </swiper-container>
    </div>
  );
}
function StoryCards({
  isLoading = false,
  storyImage: IMG_URL,
  storyDescription: caption,
  tag: poster,
}) {
  return (
    <div className="story-cards">
      {isLoading ? (
        <Skeleton height={"100%"} />
      ) : (
        <>
          <img
            src={`https://source.unsplash.com/${IMG_URL}`}
            alt="story image"
          />
          <summary>
            <div className="truncate">{caption}</div>
            <p>{poster}</p>
          </summary>
        </>
      )}
    </div>
  );
}
