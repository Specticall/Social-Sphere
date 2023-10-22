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
import { data } from "./Data/data";

// register Swiper custom elements
register();

function App() {
  const [activePage, setActivePage] = useState("landing");
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1300
  );

  // DATA (Login)
  const [userLoginData, setUserLoginData] =
    useState(usersLoginData);
  const [activeUserId, setActiveUserId] = useState(null);

  // All array of user objects
  const [allUser, setAllUser] = useState(data);

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

  // Checks if the user is viewing the home page (which will show the navbar)
  const showNavbar = [
    "friends",
    "feeds",
    "chatRoom",
    "inbox",
  ].some((page) => activePage === page);

  const props = {
    setUserLoginData,
    setActiveUserId,
    activeUserId,
    userLoginData,
    allUser,
    setAllUser,
    setActivePage,
    activePage,
    isMobile,
    setIsMobile,
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
        {/* {activePage === "friends" ? <Friends {...props} /> : null} */}
      </main>
    </>
  );
}

export default App;
