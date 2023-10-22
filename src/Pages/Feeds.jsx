// import { register } from "swiper/element/bundle";
// register();
import { useEffect, useState } from "react";

import { Slider } from "../Components/Slider";
import SearchBar from "../Components/Searchbar";
import UserProfile from "../Components/UserProfile";
import Recommendation from "../Components/Recommendation";

import { getRecommendation } from "../Helper/logic";
import { RECOMMENDATION_AMOUNT } from "../Helper/config";
import { isEmptyObject } from "../Helper/helper";

// TEMP Mockup Story data
import { storyImage } from "../Data/storydata";

export default function Feeds({
  userData,
  activeUserId,
  setActivePage,
  activePage,
  isMobile,
  allUser,
}) {
  const [openProfile, setOpenProfile] = useState(false);

  // DATA (User Object)
  const activeUser = allUser.find(
    (user) => user.id === activeUserId
  );
  const recommended = getRecommendation(
    allUser,
    activeUserId,
    RECOMMENDATION_AMOUNT
  );
  /*
  Scan all the user's friends and check if they have a story.
  */
  let stories = activeUser.data.friends
    .map(
      (friendId) =>
        allUser.find((user) => user.id === friendId)?.data
          ?.story
    )
    .filter((story) => !isEmptyObject(story));

  // TEMP
  // Adds mockup stories to make the list longer
  stories = [...stories, ...storyImage];

  /*
  Make sure the navbar is always closed when 
  screen changes from desktop to mobile
  */
  useEffect(() => {
    setOpenProfile(isMobile ? false : true);
  }, [isMobile]);

  // Prop pack
  const props = {
    activeUser,
    userData,
    setActivePage,
    activePage,
    openProfile,
    setOpenProfile,
    isMobile,
  };

  return (
    <div className="page__feeds">
      <div className="left">{/* <FriendReqs /> */}</div>
      <div className="middle">
        <SearchBar
          onOpenProfile={() => {
            setOpenProfile((current) => !current);
          }}
        />
        <Slider items={stories} />
        <h2 className="recommendation__title">
          People you might like
        </h2>
        <div className="recommendation">
          {recommended.map((id, i) => {
            const data = allUser.find(
              (user) => user.id === id
            );
            return (
              <Recommendation
                {...data}
                key={`${data.user}${i}`}
              />
            );
          })}
        </div>
      </div>
      <div className="right">
        <h2 className="your-profile__title">
          YOUR PROFILE
        </h2>
        <UserProfile {...props} />
      </div>
    </div>
  );
}
