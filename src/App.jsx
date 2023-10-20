import { useEffect, useState } from "react";
import { usersLoginData } from "./Data/userdata";

// Pages
import Login from "./Pages/Login";
import Feeds from "./Pages/Feeds";
import Navbar from "./Components/Navbar";
import Friends from "./Pages/Friends";
import Landing from "./Pages/Landing";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import FriendReqs from "./Components/FriendReqs";

// register Swiper custom elements
register();

function App() {
  const [activePage, setActivePage] = useState("landing");
  const [activeUser, setActiveUser] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // LOGIN DATA
  const [userLoginData, setUserLoginData] =
    useState(usersLoginData);

  // Detect viewport changes
  useEffect(() => {
    const detectResize = () => {
      setIsMobile(() => window.innerWidth < 1300);
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
    userLoginData,
    setActiveUser,
    activeUser,
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
        {activePage === "friends" ? <Friends {...props} /> : null}
      </main>
    </>
  );
}

export default App;
