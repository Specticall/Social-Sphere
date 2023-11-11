import { useEffect, useReducer, useRef, useState } from "react";
import { usersLoginData } from "./Data/userLogindata";

// React router
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import Chatroom from "./Pages/Chatroom";
import ChatroomNav from "./Components/ChatroomNav";
import AppLayout from "./Pages/AppLayout";
// import { getData, postData } from "./db/backend";

// register Swiper custom elements
register();

const initialState = {
  status: "loading",
  activePage: "landing",
  isMobile: window.innerWidth < 1300,
  activeUserId: "",
  dataUpdated: null,
  allUser: {},
  activeUser: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "refetch_data":
      return { ...state, dataUpdated: true };
    case "conclude_refetch":
      return { ...state, dataUpdated: false };
    case "toggle_mobile":
      return { ...state, isMobile: action.payload };
    case "switch_page":
      return { ...state, activePage: action.payload };
    default:
      throw new Error("Reducer Type Not Specified");
  }
}

function App() {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);
  // const [activePage, setActivePage] = useState("landing");

  // DATA (Login) -> Email, password, id object
  const [userLoginData, setUserLoginData] = useState(usersLoginData);

  const [activeUserId, setActiveUserId] = useState("");

  // A state for force the fetch useEffect hook to trigger
  const { dataUpdated, isMobile, activePage } = globalState;

  // Detect viewport changes
  useEffect(() => {
    const detectResize = () => {
      // Only toggle mobile when screensize goes between
      // the 1300px breakpoint
      if (window.innerWidth > 1300 && isMobile) {
        globalDispatch({ type: "toggle_mobile", payload: false });
      } else if (window.innerWidth <= 1300 && !isMobile) {
        globalDispatch({ type: "toggle_mobile", payload: true });
      }
    };

    window.addEventListener("resize", detectResize);

    return () => window.removeEventListener("resize", detectResize);
  });

  // DATA (User Object)
  const [allUser, setAllUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  // Fetch the data
  // Re-fetch data when user PUT / POST new data
  useEffect(() => {
    const getUserData = async () => {
      const [activeUser, allUser] = await Promise.all([
        getData(`www.mockdb/user_id?=${activeUserId}`),
        getData(`www.mockdb/user_all`),
      ]);

      // Waits untill all the data has finished fetching
      setActiveUser(activeUser);
      setAllUser(allUser);
      globalDispatch({ type: "conclude_refetch" });
    };

    getUserData();
  }, [activeUserId, activePage, dataUpdated]);

  // Checks if the user is viewing the home page (which will show the navbar)
  const showNavbar = ["friends", "feeds", "chatroom", "inbox"].some(
    (page) => activePage === page
  );

  // Prop pack
  const props = {
    setUserLoginData,
    userLoginData,
    activePage,
    isMobile,
    setActiveUserId,
    activeUserId,
    allUser,
    activeUser,

    globalDispatch,
    globalState,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing {...props} />} />
        <Route path="login" element={<Login {...props} />} />

        <Route path="app" element={<AppLayout props={props} />}>
          <Route path="feeds" element={<Feeds {...props} />} />
          <Route path="friends" element={<Friends {...props} />} />
          <Route path="chatroom" element={<Chatroom {...props} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  // return (
  //   <>
  //     {activePage === "landing" && <Landing {...props} />}
  //     {activePage === "login" && <Login {...props} />}
  //     <main>
  //       <div className="navbar-wrapper">
  //         {activePage === "feeds" && <FriendReqs {...props} />}
  //         {showNavbar && <Navbar {...props} />}
  //         {activePage === "chatroom" && <ChatroomNav {...props} />}
  //       </div>
  //       {activePage === "feeds" && <Feeds {...props} />}
  //       {activePage === "friends" && <Friends {...props} />}
  //       {activePage === "chatroom" && <Chatroom {...props} />}
  //     </main>
  //   </>
  // );
}

export default App;
