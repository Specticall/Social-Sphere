// import { register } from "swiper/element/bundle";
// register();
import { recommendationData } from "../Data/recommendationData";
import UserProfile from "../Components/UserProfile";
import { Slider } from "../Components/Slider";
import SearchBar from "../Components/Searchbar";
import Recommendation from "../Components/Recommendation";
import { useEffect, useState } from "react";

export default function Feeds({
  activeUser,
  userData,
  setActivePage,
  activePage,
  isMobile,
}) {
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    setOpenProfile(isMobile ? false : true);
  }, [isMobile]);

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
        <Slider />
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
        <h2 className="your-profile__title">
          YOUR PROFILE
        </h2>
        <UserProfile {...props} />
      </div>
    </div>
  );
}
