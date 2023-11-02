// import { register } from "swiper/element/bundle";
// register();
import { useEffect, useState } from "react";

import { Slider } from "../Components/Slider";
import SearchBar from "../Components/Searchbar";
import UserProfile from "../Components/UserProfile";
import RecommendationCard from "../Components/Recommendation";

import { getRecommendation } from "../Helper/logic";
import { RECOMMENDATION_AMOUNT } from "../Helper/config";
import { isEmptyObject } from "../Helper/helper";

// TEMP Mockup Story data
import { storyImage } from "../Data/storydata";

/*
  userData,
  allUser,
  activeUserObject: activeUser,
*/

export default function Feeds({
  setActivePage,
  activePage,
  isMobile,
  activeUserId,
  allUser,
  activeUser,
}) {
  const [openProfile, setOpenProfile] = useState(false);

  /*
  Scan all the user's friends and check if they have a story.
  -> Returns the an array of user story objects (whom are the users friend's)
  */
  let stories = activeUser?.friends
    .map((friendId) => allUser[friendId]?.story)
    .filter((story) => !isEmptyObject(story));

  // TEMP
  // Adds mockup stories to make the list longer
  stories = stories ? [...stories, ...storyImage] : null;

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
    activeUserId,
    setActivePage,
    activePage,
    openProfile,
    setOpenProfile,
    isMobile,
    allUser,
  };

  return (
    <div className="page__feeds">
      <div className="left">{/* <FriendReqs /> */}</div>
      <div className="middle">
        <SearchBar
          onOpenProfile={() => {
            setOpenProfile((current) => !current);
          }}
          props={props}
          isLoading={activeUser ? false : true}
        />
        <Slider items={stories} />
        <Recommendations {...props} />
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

function Recommendations({ allUser, activeUserId }) {
  /*
    State default value is needed to prevent recommendation 
    change everytime user adds a new friend / switch pages.

    With this, a new recommendation will only get created 
    on every initial render / mount of the component.
  */
  // console.log(allUser, activeUserId && allUser);
  const [isLoading, setIsLoading] = useState(
    activeUserId && allUser ? false : true
  );
  const [recommended, setRecommended] = useState(
    new Array(3).fill("loading")
  );

  useEffect(() => {
    setIsLoading(activeUserId && allUser ? false : true);

    setRecommended(
      activeUserId && allUser
        ? getRecommendation(
            allUser,
            activeUserId,
            RECOMMENDATION_AMOUNT
          )
        : new Array(3).fill("loading")
    );
  }, [allUser, activeUserId]);

  return (
    <>
      <h2 className="recommendation__title">
        People you might like
      </h2>
      <div className="recommendation">
        {recommended?.map((id, i) => {
          const data = !isLoading ? allUser[id] : null;
          return (
            <RecommendationCard
              data={data}
              key={`recommendedCard--${i}`}
            />
          );
        })}
      </div>
    </>
  );
}
