import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FriendReqs from "../Components/FriendReqs";
import ChatroomNav from "../Components/ChatroomNav";
import { DEV_LOGIN } from "../Helper/config";
import { useApp } from "../Context/AppContext";

function AppLayout() {
  const { activeUserId, setActiveUserId } = useApp();
  const navigation = useNavigate();
  const location = useLocation();

  /*
  Redirects user to login page if DEV_LOGIN is null
  and automatically loads data from DEV_LOGIN is it exist.
  */
  checkLogin: if (!activeUserId) {
    if (DEV_LOGIN) {
      setActiveUserId(DEV_LOGIN);
      break checkLogin;
    }
    navigation("/login", { replace: true });
  }

  const isCurrentlyAt = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="main-app">
      <div className="navbar-wrapper">
        <Navbar />
        {isCurrentlyAt("/feeds") && <FriendReqs />}
        {isCurrentlyAt("/chatroom") && <ChatroomNav />}
      </div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
