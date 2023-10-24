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
import { deleteDuplicatesFrom } from "./Helper/helper";

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

  // Active user id -> String
  const [activeUserId, setActiveUserId] = useState(null);

  // All array of user objects
  const [allUser, setAllUser] = useState(data);

  // Derived state that stores the object of the active user
  const activeUserObject = allUser.find(
    (user) => user.id === activeUserId
  );

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

  /*
  Handles any action that revolves around adding new data to all user object.
  */
  const handleChangeData = ({
    type,
    newData,
    changeTargetId,
  }) => {
    // Make sure the type of change is specified
    if (!type)
      return console.log(
        "NO TYPE OF DATA CHANGE IS SELECTED"
      );

    // Declare new user object template
    const newActiveUserObject = {
      id: activeUserId,
    };

    // Replace old data with new data to the object template
    if (type === "acceptFriendRequest") {
      newActiveUserObject.data = {
        ...activeUserObject.data,
        friends: newData,
        friendRequest: deleteDuplicatesFrom(
          activeUserObject.data.friendRequest,
          newData
        ),
      };
    }

    if (type === "declineFriendRequest") {
      newActiveUserObject.data = {
        ...activeUserObject.data,
        friendRequest: newData,
      };
    }

    // TEMP
    console.log(
      "DATA CHANGED",
      allUser.map((userObject) =>
        userObject.id === changeTargetId
          ? newActiveUserObject
          : userObject
      )
    );

    // Commit to change to the real object
    /*
    Maps through the entire object, changes the
    data that matches with the specifed target id
    */
    setAllUser((current) =>
      current.map((userObject) =>
        userObject.id === changeTargetId
          ? newActiveUserObject
          : userObject
      )
    );
  };

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
    activeUserObject,
    handleChangeData,
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
