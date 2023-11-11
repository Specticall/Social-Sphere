import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FriendReqs from "../Components/FriendReqs";
import ChatroomNav from "../Components/ChatroomNav";
import { DEV_LOGIN } from "../Helper/config";

function AppLayout({ props }) {
  const navigation = useNavigate();
  const location = useLocation();

  /*
  Redirects user to login page if DEV_LOGIN is null
  and automatically loads data from DEV_LOGIN is it exist.
  */
  checkLogin: if (!props.activeUserId) {
    if (DEV_LOGIN) {
      props.setActiveUserId(DEV_LOGIN);
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
        <Navbar {...props} />
        {isCurrentlyAt("/feeds") && <FriendReqs {...props} />}
        {isCurrentlyAt("/chatroom") && <ChatroomNav {...props} />}
      </div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
