import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FriendReqs from "../Components/FriendReqs";
import ChatroomNav from "../Components/ChatroomNav";
import { DEV_LOGIN } from "../Helper/config";
import { useApp } from "../Context/AppContext";
import { useEffect } from "react";
import { ChatroomProvider } from "../Context/ChatroomContext";

function AppLayout() {
  const { activeUserId, setActiveUserId, allUser } = useApp();
  const navigation = useNavigate();
  const location = useLocation();

  /*
  TEMP Redirects user to login page if DEV_LOGIN is null
  and automatically loads data from DEV_LOGIN is it exist.
  */
  useEffect(() => {
    checkLogin: if (!activeUserId) {
      if (DEV_LOGIN) {
        setActiveUserId(DEV_LOGIN);
        break checkLogin;
      }
      navigation("/login", { replace: true });
    }
  }, []);

  const isCurrentlyAt = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="main-app">
      {/* Loading protector will "protect" the UI
      from being tampered by user inputs (clicks, drags, etc)
      while it is loading */}
      {!allUser && <div className="loading-protector"></div>}

      {/* TEMP SOLUTION FOR PASSING CHATROOM Context
      so that the ChatroomNav and Chatbox component can use the same provider */}
      <ChatroomProvider>
        <div className="navbar-wrapper">
          {!isCurrentlyAt("/app/userhomepage") && <Navbar />}
          {isCurrentlyAt("/feeds") && <FriendReqs />}
          {isCurrentlyAt("/chatroom") && <ChatroomNav />}
        </div>
        <Outlet />
      </ChatroomProvider>
    </div>
  );
}

export default AppLayout;
