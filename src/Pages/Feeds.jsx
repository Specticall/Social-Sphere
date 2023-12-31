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
import { useLoading } from "../Hooks/useLoading";
import { useApp } from "../Context/AppContext";
import UserStatus from "../Components/UserStatus";
import UserHeader from "../Components/UserHeader";
import { useNavigate } from "react-router-dom";

export default function Feeds() {
  const { activeUser, isMobile, allUser } = useApp();
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

  const props = {
    openProfile,
    setOpenProfile,
  };

  return (
    <>
      <main>
        <div className="page__feeds">
          <div className="left">{/* <FriendReqs /> */}</div>
          <div className="middle">
            <FeedsSearchBar setOpenProfile={setOpenProfile} />
            <Slider items={stories} />
            <Recommendations />
          </div>
          <div className="right">
            <h2 className="your-profile__title">YOUR PROFILE</h2>
            <UserProfile {...props} />
          </div>
        </div>
      </main>
    </>
  );
}

function FeedsSearchBar({ setOpenProfile }) {
  const { activeUser, allUser } = useApp();
  const [query, setQuery] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allUser || !activeUser) return;
    if (!query) {
      setSearchResult([]);
      return;
    }
    setSearchResult(
      Object.values(allUser).filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) &&
          user.id !== activeUser.id
      )
    );
  }, [query, allUser, activeUser?.id, activeUser]);

  if (!activeUser || !allUser) return;

  return (
    <div className="feeds-searchbar-wrapper">
      <SearchBar
        onOpenProfile={() => {
          setOpenProfile((current) => !current);
        }}
        inputWatcher={(query) => {
          setQuery(query);
        }}
        activeUser={activeUser}
        isLoading={activeUser ? false : true}
      />
      {query && (
        <div className="search-suggestion">
          {searchResult.map((result) => (
            <div
              className="search-suggestion__item"
              key={`${result.id}-searchsuggestion`}
              onClick={() => {
                navigate(`../userhomepage/${result.id}`);
              }}
            >
              <UserHeader
                username={result.username}
                tag={result.tag}
                imageSource={result.pfp}
                height="3rem"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Recommendations() {
  const { allUser, activeUserId } = useApp();

  /*
    State default value is needed to prevent recommendation 
    change everytime user adds a new friend / switch pages.

    With this, a new recommendation will only get created 
    on every initial render / mount of the component.
  */
  const { isLoading } = useLoading(allUser, () =>
    activeUserId && allUser ? false : true
  );

  const [recommended, setRecommended] = useState(() =>
    new Array(3).fill("loading")
  );

  useEffect(() => {
    if (activeUserId && allUser) {
      setRecommended(
        getRecommendation(allUser, activeUserId, RECOMMENDATION_AMOUNT)
      );
    } else {
      setRecommended(new Array(3).fill("loading"));
    }
  }, [allUser, activeUserId]);

  return (
    <>
      <h2 className="recommendation__title">People you might like</h2>
      <div className="recommendation">
        {recommended?.map((id, i) => {
          const data = !isLoading ? allUser[id] : null;
          return (
            <RecommendationCard data={data} key={`recommendedCard--${i}`} />
          );
        })}
      </div>
    </>
  );
}
