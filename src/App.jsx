import { useEffect, useRef, useState } from "react";
import { usersLoginData } from "./Data/userLogindata";

// Pages
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";
import Navbar from "./Components/Navbar";
import Friends from "./Pages/Friends";
import Landing from "./Pages/Landing";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import FriendReqs from "./Components/FriendReqs";
import { getData } from "./db/backend";
// import { getData, postData } from "./db/backend";

// register Swiper custom elements
register();

function App() {
  const [activePage, setActivePage] = useState("landing");
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1300
  );

  // DATA (Login) -> Email, password, id object
  const [userLoginData, setUserLoginData] =
    useState(usersLoginData);
  const [activeUserId, setActiveUserId] = useState("");

  // A state for force the fetch useEffect hook to trigger
  const [dataUpdated, setDataUpdated] = useState(false);

  // Detect viewport changes
  useEffect(() => {
    const detectResize = () => {
      // Only toggle mobile when screensize goes between
      // the 1300px breakpoint
      if (window.innerWidth > 1300 && isMobile) {
        setIsMobile(false);
      } else if (window.innerWidth <= 1300 && !isMobile) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", detectResize);

    return () =>
      window.removeEventListener("resize", detectResize);
  });

  // DATA (User Object)
  const [allUser, setAllUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  // Fetch the data
  // Re-fetch data when user PUT / POST new data
  useEffect(() => {
    const getUserData = async () => {
      const [activeUser, allUser] = await Promise.all([
        getData(`www.mockdb/user_id?=AAA01`),
        getData(`www.mockdb/user_all`),
      ]);

      // Waits untill all the data has finished fetching
      setActiveUser(activeUser);
      setAllUser(allUser);
      setDataUpdated(false);
    };

    getUserData();
  }, [activeUserId, activePage, dataUpdated]);

  // Checks if the user is viewing the home page (which will show the navbar)
  const showNavbar = [
    "friends",
    "feeds",
    "chatRoom",
    "inbox",
  ].some((page) => activePage === page);

  // Prop pack
  const props = {
    setUserLoginData,
    userLoginData,
    setActivePage,
    activePage,
    isMobile,
    setIsMobile,
    setActiveUserId,
    activeUserId,
    allUser,
    activeUser,
    setDataUpdated,
  };

  //prettier-ignore
  return (
      <>
      {activePage === "landing" ? <Landing {...props}/> : null}
      {activePage === "login" ? <Login {...props} /> : null}
      <main>
        <div className="navbar-wrapper">
          {activePage === "feeds" ? <FriendReqs {...props}/> : null}
          {showNavbar ? <Navbar {...props}/> : null}
        </div>
        {activePage === "feeds" ? <Feeds {...props} /> : null}
        {activePage === "friends" ? <Friends {...props} /> : null}
      </main>
    </>
  );
}

export default App;
